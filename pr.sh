#!/bin/sh

set -e
docker kill $(docker ps -a -q)
echo "Pulling"ex
docker pull sindris12/tictactoe
echo "Run mongoose-migrate"
docker run -e "NODE_ENV=production" sindris12/tictactoe ./node_modules/.bin/mongoose-migrate
echo "set up production"
docker run -p 80:8080 -d -e "NODE_ENV=production" sindris12/tictactoe
