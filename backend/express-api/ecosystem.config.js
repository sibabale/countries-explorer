const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Fix the basePath to point to the correct directory
// Remove the duplicate express-api in the path
const basePath = path.resolve(__dirname); // This should resolve to /Users/.../backend/express-api

// const tsNodePath = path.join(__dirname, 'node_modules/.bin/ts-node');

module.exports = {
  apps: [
    {
      name: 'api-gateway',
      script: 'yarn dev',
      watch: true,
      cwd: path.join(basePath, 'gateway'),
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
        AUTH_SERVICE_URL: 'http://localhost:3100',
        COUNTRY_SERVICE_URL: 'http://localhost:3200'
      },
    },
    {
      name: 'auth-service',
      script: 'yarn dev',
      watch: true,
      cwd: path.join(basePath, 'auth-service'),
      env: {
        NODE_ENV: 'development',
        PORT: 3100,
        JWT_SECRET: process.env.JWT_SECRET,
        DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/user_db'
      },
    },
    {
      name: 'country-service',
      script: 'yarn  dev',
      watch: true,
      cwd: path.join(basePath, 'country-service'),
      env: {
        PORT: 3200,
        NODE_ENV: 'development',
        JWT_SECRET: process.env.JWT_SECRET,
        DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/countries_db'
      },
    }
  ]
}; 
