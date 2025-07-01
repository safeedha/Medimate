# Use official Node.js LTS version
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Compile TypeScript code
RUN npm run build

# Expose backend port (3000 or your app port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
