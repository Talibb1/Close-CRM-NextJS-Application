# Base image
FROM node:18-bullseye-slim

# Set working directory
WORKDIR /src/app

# Copy package.json and package-lock.json to the working directory
COPY ./exp-backend/package.json ./
COPY ./exp-backend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./exp-backend .

# Build TypeScript files to JavaScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 8080

# Start the app
CMD ["npm", "run", "start"]
