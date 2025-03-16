# Countries Explorer Mobile App

## Overview

Countries Explorer is a React Native mobile application that allows users to browse and explore information about countries around the world. The app features user authentication, country listings, and detailed country information.

## Features

- User authentication (login/register)
- Browse countries with search functionality
- View detailed information about each country including:
  - General information (capital, region, population, area)
  - Languages and currencies
  - Bordering countries

## Tech Stack

- TypeScript
- React Native with Expo
- React Navigation for routing
- Styled Components for styling
- Redux Toolkit for state management
- Redux Persist for persistent storage
- React Native SVG for vector graphics

## Prerequisites

- Node.js (v14 or newer)
- Yarn or npm
- Expo CLI
- iOS Simulator (for Mac users) or Android Emulator

## Installation

1. Clone the repository:

```bash
git clone git@github.com:sibabale/countries-explorer.git

cd countries-explorer/frontend/mobile
```

2. Install dependencies:

```bash
yarn install
```

3. Configure environment variables:

   - Copy the `.env.example` file to create a new `.env` file
   - Update the values in the `.env` file with your API endpoints:

   ```
   EXPO_PUBLIC_API_GATEWAY_URL='http://<YOUR_IP_ADDRESS>:3000/api'
   EXPO_PUBLIC_FALLBACK_API_URL='https://restcountries.com/v3.1/all'
   ```

4. Start the development server:

```bash
yarn start
```

5. Run on a specific platform:

```bash
# For iOS
yarn ios

# For Android
yarn android
```

## Project Structure

```
frontend/mobile/
├── assets/                # Images, fonts, and other static assets
├── src/
│   ├── components/        # UI components
│   │   ├── atoms/         # Small, reusable components
│   │   │   └── icons/     # SVG icons
│   │   └── pages/         # Screen components
│   │       ├── auth/      # Authentication screens
│   │       ├── details/   # Country details screen
│   │       └── home/      # Home screen
│   ├── navigation/        # Navigation configuration
│   │   ├── root/          # Root navigator
│   │   └── stacks/        # Stack navigators
│   ├── redux/             # Redux store and slices
│   │   ├── selectors/     # Redux selectors
│   │   └── slices/        # Redux slices
│   └── utils/             # Utility functions
├── App.tsx                # Main application component
├── index.ts               # Entry point
├── app.json               # Expo configuration
├── .env                   # Environment variables (not committed to git)
└── .env.example           # Example environment variables template
```

## API Integration

The app primarily uses the REST Countries API as a fallback to fetch country data. It also attempts to use a custom API gateway with authentication, falling back to the public API if the gateway is unavailable.

## Authentication

The app implements a simple authentication flow with:

- Login screen
- Registration screen
- Token-based authentication
- Persistent login state using Redux Persist

## Environment Variables

The application uses environment variables for configuration. Create a `.env` file based on the `.env.example` template:

```
EXPO_PUBLIC_API_GATEWAY_URL='your-api-gateway-url'
EXPO_PUBLIC_FALLBACK_API_URL='https://restcountries.com/v3.1/all'
```

These variables are used in the application to configure API endpoints.

## Available Scripts

- `yarn start`: Start the Expo development server
- `yarn android`: Start the app on Android
- `yarn ios`: Start the app on iOS
- `yarn web`: Start the app in a web browser
- `yarn format`: Format code using Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
