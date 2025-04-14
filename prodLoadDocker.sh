#!/bin/bash

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

showInfo "Clearing, loading and starting the production hotslab_prod docker container..."

docker compose -f docker-compose-production.yml down 

docker container rm hotslab_prod 

docker image rm hotslab_prod

docker image load --input hotslab_prod.tar.gz

docker compose -f docker-compose-production.yml up -d

showInfo "Finished!"
