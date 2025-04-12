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
    echo -e "-d     Stop and remove container services or just stop them i.e. \e[1m yes \e[0m or \e[1m no \e[0m. Default is \e[1m no \e[0m" 
	echo -e "-e     Enviroment chosen to run i.e. \e[1m dev \e[0m or \e[1m prod \e[0m. Default is \e[1m dev \e[0m"
	echo -e "-r     Rebuild container e.g. \e[1m yes \e[0m or \e[1m no \e[0m. Default is \e[1m no \e[0m"
    echo -e "-c     Close container only e.g. \e[1m yes \e[0m or \e[1m no \e[0m. Default is \e[1m no \e[0m"
    echo -e "-l     Show logs e.g. \e[1m yes \e[0m or \e[1m no \e[0m. Default is \e[1m no \e[0m"
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

closeContainer() {
    showInfo "Container using env file \e[1m$envFile\e[0m with stopping parameter \e[1m$down\e[0m is being stopped...."
    if [[ ${down} == 'yes' ]] 
    then docker compose -f "$envFile" down
    elif [[ ${down} == 'no' ]]
    then docker compose -f "$envFile" stop
    fi
    showInfo "Container stopped"
}

cleanUp() {
    closeContainer
    showInfo "Script externaly stopped! Exiting download process gracefully..."
    exit 1
}

cleanUp() {
  showInfo "Script externaly stopped! Exiting download process gracefully..."
  exit 1
}

trap cleanUp INT SIGINT SIGTERM

if [[ -v $1 ]]; then showHelp "No options were passed"; exit 1; fi

# Default parameters
down="no"
env="dev"
envFile="docker-compose-development.yml"
envParams=("dev", "prod")
rebuild="no"
close="no"
logs="no"

while getopts d:e:r:c:l:h: option
do
	case "${option}" in
        d) 
            if [[ ${OPTARG} == "yes" ]] || [[ ${OPTARG} == "no" ]]
            then down=${OPTARG};
            else showInfo "Error: The \e[1mStop and Remove containers\e[0m value is incorrect i.e \e[1m -d \e[0m must be either \e[1m yes \e[0m or \e[1m no \e[0m! "; exit 1; 
            fi ;;
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
        l)
            if [[ ${OPTARG} == "yes" ]] || [[ ${OPTARG} == "no" ]]
            then logs=${OPTARG};
            else showInfo "Error: The \e[1mShow Logs\e[0m value is incorrect i.e \e[1m -c \e[0m must be either \e[1m yes \e[0m or \e[1m no \e[0m! "; exit 1; 
            fi ;;
        h) 
          if ! [[ ${OPTARG} == "elp" ]] ; then showInfo "Error: The \e[1mhelp\e[0m argument should be \e[1m-help\e[0m."; exit; else showHelp; exit; fi;;
        *) showInfo "Error: Invalid option selected or paramenter not correctly filled!"; exit;;
    esac
done

mkdir -p docker/cache docker/cache/dev docker/cache/prod

if [ ! -d "docker/cache/prod/supervisor" ]; then mkdir -p docker/cache/prod/supervisor; fi
if [ ! -d "docker/cache/prod/.next" ]; then mkdir -p docker/cache/prod/.next; fi
if [ ! -d "docker/cache/prod/migrations" ]; then mkdir -p docker/cache/prod/migrations; fi
if [ ! -d "docker/cache/dev/supervisor" ]; then mkdir -p docker/cache/dev/supervisor; fi
if [ ! -d "docker/cache/dev/.next" ]; then mkdir -p docker/cache/dev/.next; fi
if [ ! -d "docker/cache/dev/migrations" ]; then mkdir -p docker/cache/dev/migrations; fi
if [ ! -d "docker/cache/dev/pgdata" ]; then mkdir -p docker/cache/dev/pgdata; fi
if [ ! -f ".env" ]; then cp .env.example .env; fi

closeContainer

if [[ $close == 'yes' ]]; then showInfo "Container has been closed."; exit 1; fi

if [[ $rebuild == 'yes' ]] 
then HOST_UID=$(id -uS) HOST_GID=$(id -g)  BUILDKIT_PROGRESS=plain docker compose -f "$envFile" up --build -d
else HOST_UID=$(id -u) HOST_GID=$(id -g)  BUILDKIT_PROGRESS=plain docker compose -f "$envFile" up -d
fi


if [[ $logs == 'yes' ]]
then
    if [[ $env == 'dev' ]] 
    then  docker logs hotslab_dev --follow 
    else  docker logs hotslab_prod --follow
    fi
fi