#!/bin/bash

# Login to docker
IMAGE_CONTAINER=$1
REGISTRY=$2
REGISTRY_USER=$3
REGISTRY_PASSWORD=$4

CONTAINER_NAME=supapp

echo "$REGISTRY_PASSWORD" | docker login $REGISTRY -u $REGISTRY_USER --password-stdin

# Pull  image
docker pull $IMAGE_CONTAINER

# Run image
docker stop $CONTAINER_NAME || true && docker rm $CONTAINER_NAME || true

docker run -p 80:3000 -d --name $CONTAINER_NAME $IMAGE_CONTAINER
