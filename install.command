#!/bin/zsh

set -euo pipefail

if ! DMG=$(ls . | grep "dmg$"); then
  echo "🚨 No .dmg file found in the current directory." >&2
  echo "👋 This window will close in 10 seconds"
  sleep 10
  exit 1
fi

if [[ -z "$DMG" ]]; then
  echo "🚨 Error: Please run this command in a directory that contains the take-counter DMG" >&2
  echo "👋 This window will close in 10 seconds"
  sleep 10
  exit 1
elif [[ "$DMG" == *$'\n'* ]]; then
  echo "🚨 Error: Please run this command in a directory that ONLY contains the take-counter dmg file" >&2
  echo "👋 This window will close in 10 seconds"
  sleep 10
  exit 1
fi

echo "🤔 Making $DMG safe to install..."
xattr -d com.apple.quarantine $DMG
echo "🚀 Done! You can safely close this window"
echo "👋 This window will close in 10 seconds"
sleep 10
