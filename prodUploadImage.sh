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

host='102.211.206.167'
user='joseph'
remotePath='/var/www/apps/hotslab'
fileName='hotslab_prod.tar.gz'

echo
echo "#######################################################"
echo "#######################################################"
echo
echo -e "\e[1mPARAMETERS USED IN UPLOAD\e[0m"
echo
echo -e "Host                    =>  \e[1m$host\e[0m"
echo -e "User                    =>  \e[1m$user\e[0m"
echo -e "Remote Path             =>  \e[1m$remotePath\e[0m"
echo -e "File Name               =>  \e[1m$fileName\e[0m"
echo
echo "#######################################################"
echo "#######################################################"
echo

showInfo "Started uploadling hotslab_prod.tar.gz to server..."

sftp $user@$host <<EOF
cd  $remotePath
rm $fileName
put $fileName
quit
EOF

showInfo "Finished!"