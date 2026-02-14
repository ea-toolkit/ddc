"""
Routes for diagram management (BPMN, Mermaid, SVG)
Supports subfolders for organization (e.g., processes/as-is, processes/to-be)
"""
import os
import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict

router = APIRouter(prefix="/api/diagrams", tags=["diagrams"])

# Base path for diagrams
DIAGRAMS_PATH = Path(__file__).parent.parent.parent.parent / "domain-knowledge" / "diagrams"


class DiagramInfo(BaseModel):
    id: str
    name: str
    type: str  # 'bpmn', 'mermaid', 'svg'
    category: str  # 'process', 'journey', 'architecture'
    subfolder: Optional[str] = None  # e.g., 'as-is', 'to-be'
    path: str
    mappingPath: Optional[str] = None


class DiagramMapping(BaseModel):
    elementId: str
    entityId: str
    label: Optional[str] = None


class DiagramData(BaseModel):
    info: DiagramInfo
    content: str
    mappings: List[DiagramMapping]


class DiagramGroup(BaseModel):
    """A group of diagrams, optionally in a subfolder"""
    name: Optional[str] = None  # Display name for subfolder (None = root level)
    diagrams: List[DiagramInfo]


class DiagramsResponse(BaseModel):
    processes: List[DiagramGroup]
    journeys: List[DiagramGroup]
    architecture: List[DiagramGroup]
    lifecycles: List[DiagramGroup]
    sequences: List[DiagramGroup]


def get_display_name(filename: str) -> str:
    """Convert filename or folder name to display name"""
    name = os.path.splitext(filename)[0]
    return name.replace('-', ' ').replace('_', ' ').title()


def scan_diagrams_folder_recursive(folder: Path, diagram_type: str, category: str) -> List[DiagramGroup]:
    """Scan a folder and its subfolders for diagram files"""
    groups = []
    
    if not folder.exists():
        return groups
    
    # Define file extensions based on type
    extensions = {
        'bpmn': ['.bpmn', '.xml'],
        'mermaid': ['.md', '.mmd', '.mermaid'],
        'svg': ['.svg'],
    }
    
    valid_extensions = extensions.get(diagram_type, [])
    
    def scan_single_folder(target_folder: Path, subfolder_name: Optional[str] = None) -> List[DiagramInfo]:
        """Scan a single folder for diagram files"""
        diagrams = []
        
        for file in target_folder.iterdir():
            if file.is_file() and file.suffix.lower() in valid_extensions:
                # Create unique ID: subfolder/filename or just filename
                if subfolder_name:
                    diagram_id = f"{subfolder_name}/{file.stem}"
                else:
                    diagram_id = file.stem
                
                # Check for mapping file
                mapping_path = target_folder / f"{file.stem}.json"
                
                diagrams.append(DiagramInfo(
                    id=diagram_id,
                    name=get_display_name(file.name),
                    type=diagram_type,
                    category=category,
                    subfolder=subfolder_name,
                    path=str(file),
                    mappingPath=str(mapping_path) if mapping_path.exists() else None
                ))
        
        return diagrams
    
    # First, scan root level files
    root_diagrams = scan_single_folder(folder)
    if root_diagrams:
        groups.append(DiagramGroup(name=None, diagrams=root_diagrams))
    
    # Then scan subfolders
    for item in sorted(folder.iterdir()):
        if item.is_dir() and not item.name.startswith('.'):
            subfolder_diagrams = scan_single_folder(item, item.name)
            if subfolder_diagrams:
                groups.append(DiagramGroup(
                    name=get_display_name(item.name),
                    diagrams=subfolder_diagrams
                ))
    
    return groups


@router.get("", response_model=DiagramsResponse)
async def get_all_diagrams():
    """Get list of all available diagrams, organized by category and subfolder"""
    return DiagramsResponse(
        processes=scan_diagrams_folder_recursive(
            DIAGRAMS_PATH / "processes", 
            "bpmn", 
            "process"
        ),
        journeys=scan_diagrams_folder_recursive(
            DIAGRAMS_PATH / "journeys", 
            "mermaid", 
            "journey"
        ),
        architecture=scan_diagrams_folder_recursive(
            DIAGRAMS_PATH / "architecture", 
            "svg", 
            "architecture"
        ),
        lifecycles=scan_diagrams_folder_recursive(
            DIAGRAMS_PATH / "lifecycles", 
            "mermaid", 
            "lifecycle"
        ),
        sequences=scan_diagrams_folder_recursive(
            DIAGRAMS_PATH / "sequences", 
            "mermaid", 
            "sequence"
        ),
    )


@router.get("/{category}/{diagram_id:path}", response_model=DiagramData)
async def get_diagram(category: str, diagram_id: str):
    """Get a specific diagram with its content and mappings.
    diagram_id can include subfolder path, e.g., 'as-is/order-fulfillment'
    """
    
    # Map category to folder and type
    category_config = {
        'processes': ('processes', 'bpmn', ['.bpmn', '.xml']),
        'journeys': ('journeys', 'mermaid', ['.md', '.mmd', '.mermaid']),
        'architecture': ('architecture', 'svg', ['.svg']),
        'lifecycles': ('lifecycles', 'mermaid', ['.md', '.mmd', '.mermaid']),
        'sequences': ('sequences', 'mermaid', ['.md', '.mmd', '.mermaid']),
    }
    
    if category not in category_config:
        raise HTTPException(status_code=404, detail=f"Category {category} not found")
    
    folder_name, diagram_type, extensions = category_config[category]
    base_folder = DIAGRAMS_PATH / folder_name
    
    # Handle subfolder in diagram_id (e.g., "as-is/order-fulfillment")
    if '/' in diagram_id:
        subfolder, file_stem = diagram_id.rsplit('/', 1)
        folder = base_folder / subfolder
    else:
        subfolder = None
        file_stem = diagram_id
        folder = base_folder
    
    # Find the diagram file
    diagram_file = None
    for ext in extensions:
        potential_file = folder / f"{file_stem}{ext}"
        if potential_file.exists():
            diagram_file = potential_file
            break
    
    if not diagram_file:
        raise HTTPException(status_code=404, detail=f"Diagram {diagram_id} not found")
    
    # Read content
    content = diagram_file.read_text(encoding='utf-8')
    
    # For mermaid files in markdown, extract the mermaid block
    if diagram_type == 'mermaid' and diagram_file.suffix == '.md':
        content = extract_mermaid_from_markdown(content)
    
    # Load mappings if available
    mappings = []
    mapping_file = folder / f"{file_stem}.json"
    if mapping_file.exists():
        try:
            mapping_data = json.loads(mapping_file.read_text(encoding='utf-8'))
            mappings = [
                DiagramMapping(
                    elementId=m.get('elementId', m.get('bpmnElementId', m.get('svgElementId', m.get('nodeId', '')))),
                    entityId=m.get('entityId', ''),
                    label=m.get('label')
                )
                for m in mapping_data.get('mappings', [])
            ]
        except (json.JSONDecodeError, KeyError) as e:
            print(f"Warning: Failed to load mappings for {diagram_id}: {e}")
    
    return DiagramData(
        info=DiagramInfo(
            id=diagram_id,
            name=get_display_name(diagram_file.name),
            type=diagram_type,
            category=category.rstrip('s'),  # processes -> process
            subfolder=subfolder,
            path=str(diagram_file),
            mappingPath=str(mapping_file) if mapping_file.exists() else None
        ),
        content=content,
        mappings=mappings
    )


def extract_mermaid_from_markdown(content: str) -> str:
    """Extract mermaid diagram from markdown content"""
    import re
    
    # Look for ```mermaid ... ``` blocks
    pattern = r'```mermaid\s*([\s\S]*?)```'
    matches = re.findall(pattern, content)
    
    if matches:
        return matches[0].strip()
    
    # If no mermaid block, assume the whole content is mermaid
    # (for .mmd files that might have .md extension)
    return content.strip()
