#!/bin/sh

set -e
echo "Killing docker image"
docker kill $(docker ps -a -q)
echo "Pulling image"
docker pull sindris12/tictactoe
echo "Run mongoose-migrate"
docker run -e "NODE_ENV=acceptance" sindris12/tictactoe ./node_modules/.bin/mongoose-migrate
echo "set up acceptance"
docker run -p 80:8080 -d -e "NODE_ENV=acceptance" sindris12/tictactoe
