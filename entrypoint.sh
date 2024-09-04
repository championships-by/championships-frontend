#!/bin/sh


echo "Building the React app..."
npm run build:prod

echo "Build completed. Keeping the container alive..."
tail -f /dev/null
