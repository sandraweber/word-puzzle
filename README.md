Word Puzzle
==========

Word Puzzle is a standalone AngularJS web application with a simple NodeJS/MongoDB backend. The user can enter his name and solve as many word puzzles (words with shuffled letters) as possible in 40 seconds. The score page shows who scored the most points, but make sure to be right the first time, because any deleting will result in a decreased score for the word.

The web application is deployed at http://puzzle.websome.ch.




##### Getting started
* Setup
   * Install MongoDB and NodeJS
   * Install gulp globally: `npm install --global gulp`
   * Run `npm install` in the root and in the `/server` folder
* Start the MongoDB using `mongod --dbpath=./data`
* Start the webserver using `gulp`


##### Deploying with Docker
The application can be deployed with Docker using the Docker file and docker script to (re)start the container. Both can be found in the folder `/docker`. The `startup.sh` script will run at startup and start the web server. The current Docker setup will loose all data when the Docker container is restarted
