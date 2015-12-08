docker stop puzzle-app
docker rm puzzle-app
docker run -d -v ~/word-puzzle/:/var/puzzle -p 80 --name=puzzle-app puzzle /bin/bash -c /var/puzzle/docker/startup.sh

