# Note-taking app

## Application Security Project

### MSCYBER23

A free note-taking app.

## Backend Development

### Prerequisites

Follow these steps to be able to help developing the project:

Verify you have `node` and `npm`

````bash
$ node --version
v20.9.0
$ npm --version
10.1.0
````

If you don't have it:

````bash
sudo apt install npm
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
````

Clone the repository:

````bash
git clone https://github.com/blueh0rse/note-taking-app
````

Install the dependencies:

````bash
cd note-taking-app
npm install
````

Run the server:

````bash
$ node server.js
Listening on port 3000
````

### Launch Mongodb local instance

First be sure mongodb is correctly installed:

````bash
$ sudo apt update
$ sudo apt-get install -y mongodb-org
````

Create the data directory:

````bash
$ cd && sudo mkdir -p data/db
````

Then start the mongo daemon:

````bash
$ sudo mongod --dbpath ~/data/db --config ./database/mongo.conf
````

Now you can access the instance by running the `mongosh` command or by accessing it using any other way (VSCode extension for example).

## Frontend Development

...
