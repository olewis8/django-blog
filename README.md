# Table of Contents
1. [Introduction](#Introduction)
2. [Features](#Features)
3. [Demo](#Demo)
4. [Built With](#Built With)
5. [Setup & Usage](#Setup & Usage)

# Introduction
Welcome! This project is a social media-esque blogging platform which I built to teach myself the fundamentals of web-app developement. It employs a Django back-end and a vanilla JavaScript front-end with a custom-built REST API to interface between them. This was a lot of fun to work on and I'm looking forward to using what I've learned in future projects.

# Features
## Blog
* Create blog posts and Read posts from other users
* Update and Delete your own posts
* Personalized home page with blog posts from users you follow
* "Discover page" with top blog posts site-wide
* Search for posts or users across the site

## Commenting System
* Fully plugable commenting system
* Authenticated users can post and delete comments asynchronously through AJAX 

## User Profiles
* User authentication via Django's built-in user model
* Personalized profile pages with bio information and user posts
* Follow users to see their posts in your home page

## Possible Future Avenues of Exploration
* Overhaul the front-end code with a modern front-end framework such as React or Vue
* Speed optimizations
    * Caching system (particularly for comment sections and the home page)
    * Smarter dynamic loading for pages and comments
* Build out commenting system by adding reply and edit features
* Notification system

# Demo
There is a live demo available at https://owenlewis.ca/blog

# Built With
* Django 4.0.3
* Bootstrap 5.1.3
* PostgreSQL
* Demo deployed to Heroku

# Setup & Usage
To run this app locally, first make sure you have Python 3.8 or higher installed. Then, simply clone the repository, install the requirements, and run it through the Django development server.
`$ git clone bla bla bla`
`$ cd bla bla bla`
`$ pipenv shell`
`$ pipenv install -r requirements.txt`
`$ cd src`
`$ python manage.py runserver`
You can then access the app through your browser at http://127.0.0.1:8000
If you do not have `pipenv` installed then you can install it through your favourite Python package manager. For example, by running 
`$ pip install pipenv`
