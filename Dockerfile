# Use an official Ubuntu runtime as a parent image
FROM ubuntu:20.04

# Set environment variables to non-interactive to avoid prompts during build
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages and Python
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /usr/src/app

# Copy the backend requirements and install them
COPY car_dealership/requirements.txt /usr/src/app/car_dealership/
RUN python3 -m pip install --upgrade pip && \
    pip3 install -r car_dealership/requirements.txt

# Copy the backend and frontend code to the container
COPY car_dealership /usr/src/app/car_dealership
COPY car_dealership_frontend /usr/src/app/car_dealership_frontend

# Expose ports for the frontend (7000) and backend (8000)
EXPOSE 7000 8000

# Copy the entrypoint script to the container
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Set the entrypoint script
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
