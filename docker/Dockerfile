FROM ubuntu
ENV VIRTUAL_HOST puzzle.websome.ch
ENV NODE_ENV docker
VOLUME ["/var/puzzle"]


#Install MongoDB
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
RUN apt-get -y update
RUN apt-get -y install mongodb-org

#Install NodeJS
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:chris-lea/node.js
RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y nodejs 


#noo.ch
WORKDIR /var/puzzle

CMD bash -C '/var/puzzle/docker/startup.sh'

