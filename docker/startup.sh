mkdir /var/mongodb/data -p
mongod --fork --logpath /var/puzzle/docker/log/mongodb.log --dbpath=/var/mongodb/data --smallfiles --noprealloc
npm install
export PATH="$(npm bin):$PATH"
gulp build
cd server
npm install
cd ..
node server/app.js
