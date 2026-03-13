#!/bin/bash
set -euo pipefail
# PreToolUse hook: block writes containing terms that break naming consistency
# If a naming map exists, checks content against it
# Exit 0 = allow, Exit 2 = block with message

input=$(cat)

FILE_PATH=$(echo "$input" | jq -r '.tool_input.file_path // empty')

# Only guard domain-knowledge/ and ddc-cycle-logs/ files
if [[ "$FILE_PATH" != *"/domain-knowledge/"* ]] && [[ "$FILE_PATH" != *"/ddc-cycle-logs/"* ]]; then
  exit 0
fi

# Only check markdown files
if [[ "$FILE_PATH" != *.md ]]; then
  exit 0
fi

# Find repo root
REPO_DIR=$(git -C "$(dirname "$FILE_PATH")" rev-parse --show-toplevel 2>/dev/null)
if [ -z "$REPO_DIR" ]; then
  exit 0
fi

# Look for a naming map — if none exists, skip check
ANON_MAP="$REPO_DIR/.private/anonymization-map.yaml"
if [ ! -f "$ANON_MAP" ]; then
  exit 0
fi

# Get content to check — Write has 'content', Edit has 'new_string'
CONTENT=$(echo "$input" | jq -r '.tool_input.content // .tool_input.new_string // empty')

if [ -z "$CONTENT" ]; then
  exit 0
fi

# Extract all 'real:' values, trim whitespace, filter to 3+ chars
REAL_NAMES=$(grep -E 'real:' "$ANON_MAP" | grep -v '^#' | sed 's/.*real://' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//' | awk 'length >= 3')

if [ -z "$REAL_NAMES" ]; then
  exit 0
fi

# Check content for each term (case-insensitive, word boundary)
FOUND=""
while IFS= read -r name; do
  [ -z "$name" ] && continue
  if echo "$CONTENT" | grep -iqw "$name" 2>/dev/null; then
    FOUND="${FOUND}  - '${name}'\n"
  fi
done <<< "$REAL_NAMES"

if [ -n "$FOUND" ]; then
  echo "BLOCKED: Content contains terms that break naming consistency:"
  echo -e "$FOUND"
  echo "Replace with the established fictional names before writing."
  exit 2
fi

exit 0
