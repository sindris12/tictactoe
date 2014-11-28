#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t sindris12/tictactoe .

echo Pusing to Docker
docker push sindris12/tictactoe

echo "Done"
