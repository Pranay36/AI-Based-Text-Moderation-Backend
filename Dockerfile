# Use Node.js base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Expose your backend port (e.g., 5000)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
