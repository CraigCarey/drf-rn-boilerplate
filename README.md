# Django Rest Framework / React Native Boilerplate

REST API & mobile client with basic auth behaviour


## Server

### (Optional) Requirements
* Vagrant
* virtualbox


### Configuring and running a Vagrant box (on the host machine):
```
$ cd server/
$ vagrant up                   # creates (if one doesn't already exist), starts and provisions a VM
$ vagrant ssh                  # connect to the VM
$ vagrant halt                 # stops the VM
$ vagrant destroy              # tears down the VM
$ vagrant reload --provision   # purges and re-initializes the db and restarts the vm
```

Files in the same directory as the Vagrantfile are synced to `/vagrant/` on the VM


### Setting up a virtual environment on your local machine
```
$ python3 -m venv drf-rn-bp-env
$ source drf-rn-bp-env/bin/activate
$ pip install -r requirements.txt
$ deactivate
```


### Run unit tests
```
$ cd server/src/
$ coverage run --source='.' manage.py test && coverage report
```


### Start Django Development Server on dev machine (starts automatically in VM)
```
$ cd server/src/
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
$ cd client/
$ npm install
$ react-native run-ios
```


## TODO
* Server
    * Password reset
    * HTTPS
* Client
    * Error modals
    * Nav menu
    * JWT
