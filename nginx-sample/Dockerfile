# Pull Ubuntu image
FROM ubuntu:18.04

# Install Nginx
RUN apt-get -y update && apt-get -y install nginx

# Copy the Nginx config
COPY default /etc/nginx/sites-available/default

# Run the Nginx server
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
