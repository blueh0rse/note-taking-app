# Backend

The backend consists of a Node.js server with an Expressjs app.

## 1. How to setup?

````bash
$ git clone https://github.com/blueh0rse/note-taking-app
$ cd note-taking-app/backend
$ npm install
````

## 2. How to run?

When everything is correctly installed, these commands should be sufficient:

````bash
$ cd note-taking-app/backend
# run database
$ sudo mongod --dbpath ~/data/db --config ./database/mongo.conf
# run server
$ node app.js
````

## 3. How to install prerequisites?

We work on Ubuntu 22.04 LTS ("Jammy").

### 3.1 Server

Verify you have `node` and `npm` in recent versions:

````bash
$ node --version
v20.9.0
$ npm --version
10.1.0
````

If you don't have:

````bash
$ sudo apt update
$ sudo apt install npm
$ sudo npm cache clean -f
$ sudo npm install -g n
$ sudo n stable
````

### 3.2 Database

For full details check the [Official Documentation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/).

Import the public key used by the package management system:

````bash
sudo apt-get install gnupg curl
````

Import the MongoDB public GPG key:

````bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
````

Create the ``/etc/apt/sources.list.d/mongodb-org-7.0.list`` file for Ubuntu 22.04 (Jammy):

````bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
````

Update your package database:

````bash
sudo apt update
````

Install latest version of MongoDB Community Edition:

````bash
sudo apt install mongodb-org
````

Create data directory:

````bash
mkdir -p ~/data/db
````

Done!

You can now refer to the ``## 2. How to run?``.
