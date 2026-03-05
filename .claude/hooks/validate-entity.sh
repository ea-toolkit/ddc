#!/bin/bash
# PreToolUse hook: validate that entity type field matches target directory
# Runs before Write/Edit on domain-knowledge/entities/** files
# Exit 0 = allow, Exit 2 = block with message

# Extract file path from TOOL_INPUT
FILE_PATH=$(echo "$TOOL_INPUT" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"file_path"[[:space:]]*:[[:space:]]*"//;s/"$//')

# Only validate entity files
if [[ "$FILE_PATH" != *"/domain-knowledge/entities/"* ]]; then
  exit 0
fi

# Only validate markdown files
if [[ "$FILE_PATH" != *.md ]]; then
  exit 0
fi

# Extract the entity type directory from the path
# e.g., .../entities/systems/foo.md -> systems
DIR_TYPE=$(echo "$FILE_PATH" | grep -o 'entities/[^/]*' | sed 's|entities/||')

if [ -z "$DIR_TYPE" ]; then
  exit 0
fi

# Extract the type field from content being written
# Look in either 'content' (Write) or the file itself (Edit)
CONTENT=$(echo "$TOOL_INPUT" | grep -o '"content"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1)

if [ -n "$CONTENT" ]; then
  # Check for type field in the YAML frontmatter
  DECLARED_TYPE=$(echo "$CONTENT" | grep -o 'type:[[:space:]]*[a-z-]*' | head -1 | sed 's/type:[[:space:]]*//')

  if [ -n "$DECLARED_TYPE" ]; then
    # Map directory names to expected type values
    # e.g., directory "systems" -> type "system", "capabilities" -> "capability"
    EXPECTED_TYPE=$(echo "$DIR_TYPE" | sed 's/s$//' | sed 's/ie$/y/' | sed 's/se$/s/')

    # Also accept exact directory name as type
    if [[ "$DECLARED_TYPE" != "$EXPECTED_TYPE" ]] && [[ "$DECLARED_TYPE" != "$DIR_TYPE" ]]; then
      echo "BLOCKED: Entity type '$DECLARED_TYPE' does not match directory '$DIR_TYPE' (expected '$EXPECTED_TYPE')"
      echo "Move the file to entities/$DECLARED_TYPE/ or fix the type field."
      exit 2
    fi
  fi
fi

exit 0