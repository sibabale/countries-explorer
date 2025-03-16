# Countries Explorer (Full Stack)

Welcome to the **Countries Explorer** project! This repository contains both the **backend** (Express microservices) and the **frontend** (React Native mobile app with Expo).

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [System Requirements](#system-requirements)  
3. [Project Structure](#project-structure)  
4. [Backend Setup](#backend-setup)  
   - [Prerequisites](#prerequisites—backend)
   - [Installation Steps](#installation-steps—backend)
   - [Running the Backend](#running-the-backend)
5. [Frontend Setup](#frontend-setup)  
   - [Prerequisites](#prerequisites—frontend)
   - [Installation Steps](#installation-steps—frontend)
   - [Running the Mobile App](#running-the-mobile-app)
6. [Testing](#testing)  
7. [Environment Variables](#environment-variables)  
8. [Common Issues & Troubleshooting](#common-issues--troubleshooting)  
9. [License](#license)

---

## Project Overview

The **Countries Explorer** is a full-stack microservices application consisting of:

1. A **Backend** built with Node.js, Express, and PostgreSQL (via Prisma).  
2. A **Mobile frontend** built with React Native (Expo) and Redux Toolkit.

Core functionalities include:
- **User authentication** (Registration & Login with JWT)  
- **Country data** retrieval and searching  
- **Rate limiting** to protect APIs  
- A **fallback** public API route if custom microservices are unavailable

---

## System Requirements

- **Node.js**: v14 or later  
- **npm** or **Yarn**: latest stable version (use your preferred package manager)  
- **PostgreSQL**: Required for backend database  
- **Expo CLI** (optional, for direct mobile debugging)  
- **Android or iOS emulator** (optional for mobile testing)

---

## Project Structure

```
/Users/sibabalejoja/projects/dev/test/countries-explorer/
  ├── backend
  │   ├── express-api
  │   │   ├── auth-service
  │   │   ├── country-service
  │   │   └── gateway (API Gateway)
  │   └── README.md 
  ├── frontend
  │   └── mobile
  │       ├── App.tsx
  │       ├── package.json
  │       └── ...
  └── README.md          
```

---

## Backend Setup

### Prerequisites — Backend

1. **Node.js** (v14 or higher)  
2. **Yarn** or **npm**  
3. **PostgreSQL** installed and running  

### Installation Steps — Backend

1. **Clone** the Repository:
   ```bash
   git clone https://github.com/sibabale/countries-explorer.git
   cd countries-explorer
   ```

2. **Navigate** to the backend directory:
   ```bash
   cd backend/express-api
   ```

3. **Install Dependencies** (for each microservice):
   ```bash
   # In the backend/express-api folder, you can install collectively or one by one
   yarn install
   # or
   npm install
   ```
   *If there are separate package.json files in each microservice folder (e.g., `auth-service`, `country-service`), run `yarn install` or `npm install` in each of those folders as well.*

4. **Set up your databases** (e.g., for `auth-service` and `country-service`). Update environment variables (discussed in [Environment Variables](#environment-variables)). Then run:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
   Do this in each microservice that has a `prisma` directory.

### Running the Backend

1. **Local Development**:
   ```bash
   # From each service's directory, for example:
   cd auth-service
   yarn dev
   # or
   cd country-service
   yarn dev
   ```
   Or run them all in parallel using your favorite process manager (e.g., **PM2**). Check the existing `ecosystem.config.js` for easy PM2 commands.

2. **PM2** (Process Management):
   ```bash
   # From backend/express-api/ run:
   yarn pm2:start:all
   # or
   pm2 start ecosystem.config.js
   ```

3. **Verify** each service is running:
   - API Gateway on **port 3000**
   - Auth Service on **port 3100**
   - Country Service on **port 3200**

---

## Frontend Setup

### Prerequisites — Frontend

- **Node.js** (v14 or later)  
- **Yarn** or **npm**  
- **Expo CLI** (installed globally)  
  ```bash
  npm install --global expo-cli
  # or
  yarn global add expo-cli
  ```  

### Installation Steps — Frontend

1. **Navigate** to the mobile frontend:
   ```bash
   cd ../frontend/mobile
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Configure Environment Variables**:  
   Copy `.env.example` to `.env` if needed:
   ```bash
   cp .env.example .env
   ```
   Then set the `EXPO_PUBLIC_API_GATEWAY_URL` to point to your local or remote API Gateway. Example:
   ```
   EXPO_PUBLIC_API_GATEWAY_URL='http://<YOUR_IP_ADDRESS>/api' 
   EXPO_PUBLIC_FALLBACK_API_URL='https://restcountries.com/v3.1/all'
   ```

### Running the Mobile App

1. **Start** the Expo dev server:
   ```bash
   yarn start
   # or
   npm start
   ```
2. In the Expo console, choose to **Run on iOS simulator**, **Run on Android emulator**, or **Run in web**.

---

## Testing

### Backend Tests

- **Auth Service** uses Jest for test coverage:
  ```bash
  cd backend/express-api/auth-service
  yarn test
  ```
- **Country Service** has a similar structure. Run:
  ```bash
  cd backend/express-api/country-service
  yarn test
  ```

### Frontend Tests
_Currently unimplemented or minimal. More details can be added if you create test suites._

---

## Environment Variables

Below is a brief overview. See each service’s own `.env.example` or documentation for more details.

<details>
<summary>API Gateway (.env)</summary>

```
PORT=3000
AUTH_SERVICE_URL=http://localhost:3100
COUNTRY_SERVICE_URL=http://localhost:3200
```
</details>

<details>
<summary>Auth Service (.env)</summary>

```
PORT=3100
JWT_SECRET="your-secret-key"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_db"
```
</details>

<details>
<summary>Country Service (.env)</summary>

```
PORT=3200
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
```
</details>

<details>
<summary>Frontend Mobile (.env)</summary>

```
EXPO_PUBLIC_API_GATEWAY_URL='http://<YOUR_IP>:3000/api'
EXPO_PUBLIC_FALLBACK_API_URL='https://restcountries.com/v3.1/all'
```
</details>

---

## Common Issues & Troubleshooting

1. **Port Conflicts**  
   Make sure ports `3000, 3100, 3200` are not used by other processes. You can edit `.env` or config files as needed.

2. **Database Connection Errors**  
   Make sure PostgreSQL is running locally or update the `DATABASE_URL` to a valid remote instance.

3. **Mobile Network Access**  
   When running on an emulator, ensure both the phone/emulator can access the local machine’s IP (e.g., `http://192.168.x.x:3000`). Update the `.env` in the mobile folder accordingly.

4. **Expo CLI**  
   If the app fails to start in the emulator, try:
   ```bash
   expo doctor
   expo start -c
   ```
   to clear caches or fix any known issues.

---

## License

This project is released under the [ISC License](./backend/express-api/auth-service/README.md#license) or your chosen license. Feel free to modify and distribute.

---

**Happy Coding!**
```
