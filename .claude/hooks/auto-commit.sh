#!/bin/bash
# Auto-commit hook for DDC cycles
# Triggers after Write/Edit on domain-knowledge or ddc-cycle-logs files
# Follows the DDC principle: "Commit Early, Commit Often"
# A logical unit = one entity added, one diagram updated, one decision documented

# Extract file path from TOOL_INPUT (JSON)
FILE_PATH=$(echo "$TOOL_INPUT" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"file_path"[[:space:]]*:[[:space:]]*"//;s/"$//')

# Exit if no file path found
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only auto-commit files in domain-knowledge/ or ddc-cycle-logs/
if [[ "$FILE_PATH" != *"/domain-knowledge/"* ]] && [[ "$FILE_PATH" != *"/ddc-cycle-logs/"* ]]; then
  exit 0
fi

# Determine the repo root from the file path
REPO_DIR=$(git -C "$(dirname "$FILE_PATH")" rev-parse --show-toplevel 2>/dev/null)
if [ -z "$REPO_DIR" ]; then
  exit 0
fi

# Get relative path for commit message
REL_PATH=$(python3 -c "import os; print(os.path.relpath('$FILE_PATH', '$REPO_DIR'))" 2>/dev/null)

# Determine commit message based on path
if [[ "$REL_PATH" == *"/ddc-cycle-logs/"* ]]; then
  BASENAME=$(basename "$FILE_PATH" .md)
  COMMIT_MSG="log: DDC cycle ${BASENAME}"
elif [[ "$REL_PATH" == *"/entities/"* ]]; then
  # Extract entity type from path (e.g., entities/systems/foo.md -> systems)
  ENTITY_TYPE=$(echo "$REL_PATH" | grep -o 'entities/[^/]*' | sed 's|entities/||')
  BASENAME=$(basename "$FILE_PATH" .md)
  COMMIT_MSG="add: ${ENTITY_TYPE} entity ${BASENAME}"
elif [[ "$REL_PATH" == *"/diagrams/"* ]]; then
  BASENAME=$(basename "$FILE_PATH")
  COMMIT_MSG="add: diagram ${BASENAME}"
elif [[ "$REL_PATH" == *"/decisions/"* ]]; then
  BASENAME=$(basename "$FILE_PATH" .md)
  COMMIT_MSG="add: decision ${BASENAME}"
else
  COMMIT_MSG="update: ${REL_PATH}"
fi

# Stage and commit
cd "$REPO_DIR"
git add "$FILE_PATH"

# Only commit if there are staged changes
if git diff --cached --quiet 2>/dev/null; then
  exit 0
fi

git commit -m "$COMMIT_MSG

Co-Authored-By: Claude <noreply@anthropic.com>" --no-verify 2>/dev/null

exit 0
