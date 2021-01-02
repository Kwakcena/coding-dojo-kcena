#!/bin/bash

FOLDER_NAME=`date "+%Y%m%d"`

mkdir ${FOLDER_NAME} \
	&& cd ${FOLDER_NAME} \
	&& npm init -y \
	&& npm i -D jest @types/jest \
	&& gsed -i 's/echo \\"Error: no test specified\\" && exit 1/jest/' package.json
