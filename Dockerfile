# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /NodeJs_Assessment_2

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make the container's port 3000 available to the outside
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV MONGODB_URI=mongodb://127.0.0.1:27017/messages

# Run the application
CMD ["npm", "start"]
