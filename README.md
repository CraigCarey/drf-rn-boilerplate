# Django Rest Framework / React Native Boilerplate

REST API & mobile client with basic auth behaviour


## Server

### Requirements
* Vagrant
* virtualbox

### Setting up Vagrant box (on the host machine):
```
$ vagrant init     # creates a config file if one doesn't exist
$ vagrant up
$ vagrant ssh
$ vagrant halt
$ vagrant destroy

```

Files in the same directory as the Vagrantfile are synced to `/vagrant/`

### Setting up a virtual environment (on the Vagrant box):
```
$ mkvirtualenv drf-rn-boilerplate --python=python3
$ deactivate
$ workon drf-rn-boilerplate
```

### Setting up a virtual environment (on your local machine):
```
$ python3 -m venv drf-rn-boilerplate
$ source drf-rn-boilerplate/bin/activate
$ deactivate
```

### Install requirements
```
$ pip install -r requirements.txt
```

### Run unit tests
```
$ cd src
$ coverage run --source='.' manage.py test && coverage report
```

### Start Django Development Server
```
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py createsuperuser
$ python manage.py runserver 0.0.0.0:8080 # listen on all IP Addresses
```

### API Endpoints

#### Users

* **/api/auth/profile/** (User registration endpoint)
* **/api/auth/login/** (User login endpoint)
* **/api/auth/logout/** (User logout endpoint)


#### Todos

* **/api/todos/** (Todo create and list endpoint)
* **/api/todos/{todo-id}/** (Todo retrieve, update and destroy endpoint)


## Client
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install node
$ brew install watchman
$ cd client
$ npm install
$ react-native run-ios
```

## TODO
* Server
    * Password reset
    * HTTPS
    * Upgrade to Django 2.0
* Client
    * login with username OR email
    * Nav menu
    * JWT
