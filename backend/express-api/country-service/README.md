# Country Service API

A microservice handling country data operations for the Countries Explorer application.

## Features

- Country data management
- Data caching
- Rate limiting
- Security middleware (Helmet)
- PostgreSQL database with Prisma ORM
- JSON data source integration

## Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Express Rate Limit
- Helmet for security

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- yarn or npm

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
PORT=3001
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Set up the database:

```bash
npx prisma migrate dev
npx prisma generate
```

4. Start the development server:

```bash
yarn dev
```

## API Endpoints

### GET /api/countries

Get all countries.

**Response (200):**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Country Name",
      "capital": "Capital City",
      "region": "Region",
      "population": 1000000
      // ... other country data
    }
  ]
}
```

### GET /api/countries/search

Get a specific country by name.

**Response (200):**

```json
{
  "data": {
    "id": 1,
    "name": "Country Name",
    "capital": "Capital City",
    "region": "Region",
    "population": 1000000
    // ... other country data
  }
}
```

## Rate Limiting

The API implements rate limiting with the following rules:

- 2 requests per second per IP address
- Exceeding this limit will return a 429 status code

## Security Features

- Helmet.js for security headers
- CORS enabled
- Rate limiting protection
- Input validation

## Available Scripts

| Command         | Description               |
| --------------- | ------------------------- |
| `yarn dev`      | Start development server  |
| `yarn build`    | Build for production      |
| `yarn start`    | Start production server   |
| `yarn test`     | Run tests                 |
| `yarn lint`     | Run linter                |
| `yarn lint:fix` | Fix linting issues        |
| `yarn format`   | Format code with Prettier |

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 400: Bad Request
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Database Schema

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

## Author

Sibabale Joja

## License

ISC
