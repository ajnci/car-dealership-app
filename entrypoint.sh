#!/bin/sh

# Start the frontend server
cd /usr/src/app/car_dealership_frontend
python3 -m http.server 7000 &

# Start the Django backend server
cd /usr/src/app/car_dealership
python3 manage.py runserver 0.0.0.0:8000
