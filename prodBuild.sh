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

docker container rm hotslab_prod -f
docker image rm hotslab_prod -f
docker builder prune -f
docker buildx prune -f
docker system prune -f
if [ -f hotslab_prod.tar.gz ]; then rm hotslab_prod.tar.gz; fi

showInfo "Building the image..."

BUILDKIT_PROGRESS=plain docker compose -f docker-compose-production.yml build

showInfo "Creating hotslab_prod.tar.gz file..."

docker image save hotslab_prod | gzip > hotslab_prod.tar.gz

showInfo "Finished!"