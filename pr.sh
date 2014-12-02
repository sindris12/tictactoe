#!/bin/sh

set -e
docker kill $(docker ps -a -q)
docker pull sindris12/tictactoe
docker run -p 80:8080 -d -e "NODE_ENV=production" sindris12/tictactoe
