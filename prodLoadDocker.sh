#!/bin/bash

showInfo() {
	echo
	echo "======================================================="
	echo -e "$(date -u): " "${1}"
	echo "======================================================="
	echo
}

cleanUp() {
    showInfo "Script externaly stopped! Exiting download process gracefully..."
    exit 1
}

trap cleanUp INT SIGINT SIGTERM

showInfo "Clearing, loading and starting the production hotslab_prod docker container..."

docker stop hotslab_prod

docker container rm hotslab_prod -f

docker image rm hotslab_prod -f

docker image load --input hotslab_prod.tar.gz

docker run -d \
	--name hotslab_prod \
	--add-host host.docker.internal:host-gateway \
	--restart unless-stopped \
	-p 127.0.0.1:3000:3000 \
	-e CHOKIDAR_USEPOLLING=1 \
	hotslab_prod

showInfo "Finished!"
