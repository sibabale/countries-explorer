# Backend Documentation for Countries Explorer

Backend architecture of the Countries Explorer application.

## Overview

The Countries Explorer backend is built using a microservices architecture with the following components:

1. **API Gateway** - Entry point for all client requests
2. **Auth Service** - Handles user authentication and management
3. **Country Service** - Manages country data operations

## System Architecture

```
Client Applications
       │
       ▼
┌─────────────┐
│ API Gateway │ (Port 3000)
└─────┬───┬───┘
      │   │
      │   │
┌─────▼─┐ ┌▼────────────┐
│ Auth  │ │ Country     │
│Service│ │Service      │
│(3100) │ │(3200)       │
└───────┘ └─────────────┘
```

## API Gateway

The API Gateway serves as the single entry point for all client requests and routes them to the appropriate microservice.

### Features
- Request routing to appropriate microservices
- Rate limiting (100 requests per 15 minutes)
- CORS support
- Security headers via Helmet
- Logging with Winston and Morgan

### Endpoints
- `/api/auth/*` - Routes to Auth Service
- `/api/countries/*` - Routes to Country Service
- `/health` - Health check endpoint

## Auth Service

The Auth Service handles user authentication and management operations.

### Features
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting (2 requests per second)
- PostgreSQL database with Prisma ORM

### Database Schema
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      String   @default("USER")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user

### Authentication Flow
1. User registers or logs in
2. Server validates credentials
3. On success, server issues a JWT token valid for 24 hours
4. Client includes this token in the Authorization header for protected requests

## Country Service

The Country Service handles all operations related to country data.

### Features
- Country data management
- Data caching
- Rate limiting
- PostgreSQL database with Prisma ORM

### Database Schema
```prisma
model Country {
  id             Int          @id @default(autoincrement())
  name           Json?
  tld            String[]
  independent    Boolean?
  status         String?
  unMember       Boolean?
  currencies     Json?
  idd            Json?
  capital        String[]
  region         String?
  subregion      String?
  languages      Json?
  latlng         Float[]
  landlocked     Boolean?
  flag           String?
  maps           Json?
  population     Int?
  timezones      String[]
  continents     String[]
  flags          Json?
  startOfWeek    String?
  capitalInfo    Json?
  postalCode     Json?
  borders        String[] @default([])
}
```

### Endpoints
- `GET /api/countries` - Get all countries
- `GET /api/countries/search` - Get a specific country by name

## Security Measures

1. **Authentication** - JWT-based authentication with 24-hour expiration
2. **Password Security** - Passwords are hashed using bcrypt
3. **Rate Limiting** - Prevents abuse of the API
4. **Security Headers** - Implemented via Helmet
5. **CORS** - Configured to control access to the API
6. **Environment Variables** - Sensitive information stored in environment variables

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- yarn or npm

### Environment Variables

#### API Gateway (.env)
```
PORT=3000
AUTH_SERVICE_URL=http://localhost:3100
COUNTRY_SERVICE_URL=http://localhost:3001
```

#### Auth Service (.env)
```
PORT=3100
JWT_SECRET="your-secret-key"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_db"
```

#### Country Service (.env)
```
PORT=3001
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
```

### Installation and Setup

1. Clone the repository
2. Install dependencies for each service:
   ```bash
   cd backend/express-api/[service-name]
   yarn install
   ```
3. Set up the databases:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
4. Start the services:
   ```bash
   yarn dev
   ```

## Testing

The backend includes unit tests for the Auth Service controllers using Jest. Run tests with:

```bash
yarn test
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Logging

The API Gateway uses Winston for logging:
- Info logs are stored in `combined.log`
- Error logs are stored in `error.log`

## Process Management with PM2

The Countries Explorer backend uses PM2 for process management, ensuring high availability and easy monitoring.

### Installation

If you haven't installed PM2 globally:

```bash
npm install -g pm2
```

### Commands

From the root backend directory:

```bash
# Install dependencies for all services
yarn install:all

# For production: Build all services first
yarn build:all

# Start all services with PM2
yarn pm2:start:all

# Stop all services
yarn pm2:stop:all

# Restart all services
yarn pm2:restart:all

# View logs for all services
yarn pm2:logs

# Monitor services in real-time
yarn pm2:monit

# Check status of all services
yarn pm2:status
```

Individual service management:

```bash
# Navigate to a specific service directory
cd express-api/[service-name]

# Start just this service
yarn pm2:start

# View logs for just this service
yarn pm2:logs
```

### PM2 Features Used

- **Monitoring**: Real-time monitoring with `pm2 monit`
- **Logs Management**: Centralized logs with `pm2 logs`
- **Process Management**: Automatic restarts on crashes

## Areas for Improvement

### Scalability
1. **Container Orchestration** - Implement Docker and Kubernetes for better scalability and deployment management
2. **Load Balancing** -          Add load balancing for high-traffic scenarios
3. **Database Sharding** - Consider database sharding for handling larger datasets

### Security
1. **Request Validations** - Implement Zod for Express Validator on incoming requests
2. **API Key Management** -  Implement a more robust API key management system
3. **OAuth Integration** -   Add OAuth 2.0 support for third-party authentication


### Performance
1. **Caching Strategy** -      Implement Redis for more efficient caching
2. **Query Optimization** -    Optimize database queries for better performance

### Monitoring and Observability
1. **Centralized Logging** - Implement PostHog for stack traces or similar for centralized logging
2. **APM Tools** - Add Application Performance Monitoring tools
3. **Metrics Collection** - Implement Prometheus for metrics collection and Grafana for visualization

### Development Experience
1. **API Documentation** -   Add [Swagger](https://swagger.io/) documentation or [Mintlify](https://mintlify.com)
2. **End-to-End Testing** -  Implement comprehensive end-to-end testing
3. **CI/CD Pipeline** -      Enhance the CI/CD pipeline for automated testing and deployment

