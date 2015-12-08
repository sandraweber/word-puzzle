mkdir /var/mongodb/data -p
mkdir /var/puzzle/docker/log
mongod --fork --logpath /var/puzzle/docker/log/mongodb.log --dbpath=/var/mongodb/data --smallfiles --noprealloc
rm /var/puzzle/dist -R -f
npm install
export PATH="$(npm bin):$PATH"
gulp build
cd server
npm install
cd ..
node server/app.js
