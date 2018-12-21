# specify the node base image with your desired version node:<version>
FROM ubuntu:16.04
# Set the working directory to /tmp/script
WORKDIR /tmp/script
# Copy the current directory contents into the container at /tmp/script
# COPY . /tmp/script
ADD script_loader.sh .
# add permission
RUN chmod +x ./script_loader.sh
# replace this with your application's default port
# EXPOSE 8888
# Define environment variable
#ENV NAME World
# run script_loader
ENTRYPOINT ["/bin/bash"]
CMD ["./script_loader.sh"]
