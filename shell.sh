#!/bin/bash

set -e
export PATH=$PATH:/usr/local/bin
echo Cleaning...
rm -rf ./dist
echo "Installing grunt"
npm install grunt
echo "Installing bower"
npm install bower
echo "Npm install"
npm install
echo "Bower install"
bower install
echo "Running grunt"
grunt
cp ./Dockerfile ./dist/
cd dist
npm install --production
echo Building docker image
docker build -t sindris12/tictactoe .

