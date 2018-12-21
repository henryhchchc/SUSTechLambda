# specify the node base image with your desired version node:<version>
FROM node:8
# Set the working directory to /tmp/script
WORKDIR /tmp/script
# Copy the current directory contents into the container at /tmp/script
COPY . /tmp/script
# replace this with your application's default port
# EXPOSE 8888
# Define environment variable
#ENV NAME World
# run script_loader
CMD ["node", "script_loader.js"]
