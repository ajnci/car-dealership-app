# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory
WORKDIR /app/
# Install system dependencies required for mysqlclient
RUN apt-get update && apt-get install -y
RUN apt-get install gcc -y
RUN apt-get install default-libmysqlclient-dev -y
RUN apt-get install build-essential -y
RUN apt-get install python3-dev -y
RUN apt-get install pkg-config -y
# Copy the backend and frontend code to the container
COPY . /app/

# Copy the backend requirements and install them
RUN pip install --no-cache-dir -r requirements.txt

RUN pip install djangorestframework-simplejwt

RUN pip install mysqlclient

RUN pip install django-cors-headers

# Expose ports for the frontend (7000) and backend (8000)
EXPOSE 7000 8000

# Copy the entrypoint script to the container
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]