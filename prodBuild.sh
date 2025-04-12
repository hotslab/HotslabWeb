#!/bin/bash

set -e

showInfo() {
	echo
	echo "======================================================="
	echo -e "$(date -u): " ${1}
	echo "======================================================="
	echo
}

cleanUp() {
    showInfo "Script externaly stopped! Exiting download process gracefully..."
    exit 1
}

trap cleanUp INT SIGINT SIGTERM

showInfo "Cleasring old image and container files..."

docker container rm softnance_frontend_prod -f
docker image rm softnance_frontend_prod -f
docker builder prune -f
docker buildx prune -f
docker system prune -f
if [ -f softnance_frontend_prod.tar.gz ]; then rm softnance_frontend_prod.tar.gz; fi

showInfo "Building the image..."

BUILDKIT_PROGRESS=plain docker compose -f docker-compose-production.yml build

showInfo "Creating softnance_frontend_prod.tar.gz file..."

docker image save softnance_frontend_prod | gzip > softnance_frontend_prod.tar.gz

showInfo "Finished!"