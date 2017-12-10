# Django Rest Framework / React Native Boilerplate

REST API & mobile client with basic auth behaviour

DRF Server based on [Mark Winterbottom's Udemy course](https://www.udemy.com/django-python)


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
$ mkvirtualenv profiles_api --python=python3
$ deactivate
$ workon profiles_api
```

### Install requirements
```
$ pip install django==1.11
$ pip install djangorestframework==3.6.2
```

### Start Django project
```
$ mkdir /vagrant/src/ && cd /vagrant/src/
$ django-admin.py startproject profiles_project
$ cd profiles_project
$ python manage.py startapp profiles_api
```

### Start Django Development Server
```
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py createsuperuser
$ python manage.py runserver 0.0.0.0:8080 # listen on all IP Addresses
```


## Client
TODO


## TODO
* Add server unit tests
* Client
* PostgreSQL
