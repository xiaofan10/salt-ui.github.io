#!/bin/sh
echo "Start to copy..."
cd node_modules/@ali
rsync -R tingle-*/README.md tingle-*/HISTORY.md tingle-*/package.json ../../components
echo "Copy finished."
