#!/bin/bash

set -e

showHelp()
{
	# Display Help
	echo -e "\e[1mRUN HOTSLAB CONTAINER \e[0m"
	echo
	echo "Syntax: bash start.sh [-e|r|c|help]"
	echo
	echo "Double click CTRL + C to close running script"
	echo
	echo "Options:"
	echo -e "-e     Enviroment chosen to run i.e. \e[1m dev \e[0m or \e[1m prod \e[0m. Default is \e[1m dev \e[0m"
	echo -e "-r     Rebuild container e.g. \e[1m yes \e[0m or \e[1m no \e[0m. Default is \e[1m no \e[0m"
  echo -e "-c     Close container only e.g. \e[1m yes \e[0m or \e[1m no \e[0m. Default is \e[1m no \e[0m"
	echo -e "-help  Print this \e[1mhelp screen\e[0m"
	echo
}

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

if [[ -v $1 ]]; then showHelp "No options were passed"; exit 1; fi

# Default parameters
env="dev"
envFile="docker-compose-development.yml"
envParams=("dev", "prod")
rebuild="no"
close="no"

while getopts e:r:c:h: option
do
	case "${option}" in
        e) 
            if [[ ${envParams[@]} =~ ${OPTARG} ]]
            then 
                env=${OPTARG};
                if [[ ${OPTARG} == "prod" ]] then envFile="docker-compose-production.yml"; fi
            else showInfo "Error: The \e[1mEnvironement\e[0m value is incorrect i.e \e[1m -e \e[0m must be either \e[1m dev \e[0m or \e[1m prod \e[0m! "; exit 1; 
            fi ;;
        r) 
            if [[ ${OPTARG} == "yes" ]] || [[ ${OPTARG} == "no" ]]
            then rebuild=${OPTARG};
            else showInfo "Error: The \e[1mRebuid container\e[0m value is incorrect i.e \e[1m -r \e[0m must be either \e[1m yes \e[0m or \e[1m no \e[0m! "; exit 1; 
            fi ;;
        c) 
            if [[ ${OPTARG} == "yes" ]] || [[ ${OPTARG} == "no" ]]
            then close=${OPTARG};
            else showInfo "Error: The \e[1mClose\e[0m value is incorrect i.e \e[1m -c \e[0m must be either \e[1m yes \e[0m or \e[1m no \e[0m! "; exit 1; 
            fi ;;
        h) 
          if ! [[ ${OPTARG} == "elp" ]] ; then showInfo "Error: The \e[1mhelp\e[0m argument should be \e[1m-help\e[0m."; exit; else showHelp; exit; fi;;
        *) showInfo "Error: Invalid option selected or paramenter not correctly filled!"; exit;;
    esac
done

mkdir -p docker/cache docker/cache/dev docker/cache/prod

if [ ! -d "docker/cache/prod/supervisor" ]; then mkdir -p docker/cache/prod/supervisor; fi
if [ ! -d "docker/cache/prod/.next" ]; then mkdir -p docker/cache/prod/.next; fi
if [ ! -d "docker/cache/dev/supervisor" ]; then mkdir -p docker/cache/dev/supervisor; fi
if [ ! -d "docker/cache/dev/.next" ]; then mkdir -p docker/cache/dev/.next; fi
if [ ! -d "docker/cache/dev/pgdata" ]; then mkdir -p docker/cache/dev/pgdata; fi
if [ ! -f ".env" ]; then cp .env.example .env; fi

docker compose -f "$envFile" down

if [[ $close == 'yes' ]]; then showInfo "Container has been closed."; exit 1; fi

if [[ $rebuild == 'yes' ]] 
then HOST_UID=$(id -uS) HOST_GID=$(id -g) docker compose -f "$envFile" up --build -d
else HOST_UID=$(id -u) HOST_GID=$(id -g) docker compose -f "$envFile" up -d
fi
