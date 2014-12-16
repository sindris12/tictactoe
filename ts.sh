#!/bin/sh

set -e
docker kill $(docker ps -a -q)
docker pull sindris12/tictactoe
docker run -e "NODE_ENV=acceptance" sindris12/tictactoe ./node_modules/.bin/mongoose-migrate
docker run -p 80:8080 -d -e "NODE_ENV=acceptance" sindris12/tictactoe
