# Pull Nginx image
FROM nginx:latest

# Create app directory
WORKDIR /app

# Copy the Nginx config
COPY default /etc/nginx/sites-available/default

COPY index.html /usr/share/nginx/html/index.html

# Run the Nginx server
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
