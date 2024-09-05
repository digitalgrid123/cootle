# Base image
FROM node:18-alpine AS base

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy necessary files into the container
COPY ./src ./src
COPY ./public ./public
COPY ./next.config.js ./next.config.js

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
