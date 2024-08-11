#!/bin/sh

# Build the React app
echo "Building the React app..."
npm run build:prod

# Optional: Start a server (if applicable)
# echo "Starting the server..."
# npm start

# Keep the container running after the build
echo "Build completed. Keeping the container alive..."
tail -f /dev/null