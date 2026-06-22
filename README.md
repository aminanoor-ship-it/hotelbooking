# Hotel Booking System

A full-stack hotel booking application with a .NET 8 Web API backend and a React + Vite frontend.

## Project Structure

```
hotelbooking/
├── HotelBookingAPI/          # .NET 8 Web API
│   └── HotelBookingAPI/
│       ├── Controllers/      # API endpoints
│       ├── Data/             # EF Core DbContext
│       ├── Migrations/       # Database migrations
│       ├── Models/           # Entity models
│       └── Program.cs        # App configuration
│
└── hotel-client/             # React + Vite frontend
    ├── src/
    └── package.json
```

## Tech Stack

- **Backend:** .NET 8, ASP.NET Core Web API, Entity Framework Core, MySQL (Pomelo)
- **Frontend:** React 19, Vite, React Router DOM, Axios
- **Authentication:** ASP.NET Core Identity + JWT Bearer tokens
- **API Documentation:** Swashbuckle (Swagger)

## Prerequisites

Before you begin, make sure you have the following installed:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (LTS recommended, includes npm)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) (version 8.0+ recommended)
- (Optional) [Git](https://git-scm.com/) for version control

## Installed Packages

### Backend NuGet Packages (`HotelBookingAPI/HotelBookingAPI.csproj`)

| Package | Version | Purpose |
|---------|---------|---------|
| `AutoMapper` | 16.1.1 | Object mapping |
| `Microsoft.AspNetCore.Authentication.JwtBearer` | 8.0.0 | JWT authentication |
| `Microsoft.AspNetCore.Identity.EntityFrameworkCore` | 8.0.0 | ASP.NET Core Identity |
| `Microsoft.EntityFrameworkCore` | 8.0.0 | Entity Framework Core ORM |
| `Microsoft.EntityFrameworkCore.Design` | 8.0.0 | EF Core design-time tools |
| `Microsoft.EntityFrameworkCore.Tools` | 8.0.0 | EF Core CLI tools |
| `Pomelo.EntityFrameworkCore.MySql` | 8.0.0 | MySQL provider for EF Core |
| `Swashbuckle.AspNetCore` | 8.0.0 | Swagger/OpenAPI documentation |

### Frontend npm Packages (`hotel-client/package.json`)

**Dependencies:**

| Package | Version | Purpose |
|---------|---------|---------|
| `axios` | ^1.18.0 | HTTP client for API calls |
| `react` | ^19.2.6 | UI library |
| `react-dom` | ^19.2.6 | React DOM renderer |
| `react-router-dom` | ^7.18.0 | Client-side routing |

**Development Dependencies:**

| Package | Version | Purpose |
|---------|---------|---------|
| `@eslint/js` | ^10.0.1 | ESLint core config |
| `@types/react` | ^19.2.14 | TypeScript definitions for React |
| `@types/react-dom` | ^19.2.3 | TypeScript definitions for React DOM |
| `@vitejs/plugin-react` | ^6.0.1 | Vite plugin for React |
| `eslint` | ^10.3.0 | JavaScript/JSX linter |
| `eslint-plugin-react-hooks` | ^7.1.1 | ESLint rules for React Hooks |
| `eslint-plugin-react-refresh` | ^0.5.2 | ESLint rules for React Fast Refresh |
| `globals` | ^17.6.0 | Global variable definitions for ESLint |
| `vite` | ^8.0.12 | Frontend build tool |

## Installation

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd hotelbooking
```

### 2. Install Backend Packages

From the API project folder:

```bash
cd HotelBookingAPI/HotelBookingAPI
dotnet restore
```

This downloads all NuGet packages listed in `HotelBookingAPI.csproj`.

### 3. Install Frontend Packages

From the client folder:

```bash
cd ../../hotel-client
npm install
```

This installs all dependencies listed in `package.json`.

## Configuration

The API uses ASP.NET Core User Secrets to store sensitive configuration locally. **Do not commit secrets to Git.**

1. Navigate to the API project directory:

   ```bash
   cd HotelBookingAPI/HotelBookingAPI
   ```

2. Initialize user secrets (if not already done):

   ```bash
   dotnet user-secrets init
   ```

3. Set your real connection string and JWT values:

   ```bash
   dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost;Port=3306;Database=hotelbooking;User=root;Password=YOUR_DB_PASSWORD;"
   dotnet user-secrets set "Jwt:Key" "REPLACE_WITH_YOUR_OWN_SECURE_KEY_AT_LEAST_32_CHARS"
   dotnet user-secrets set "Jwt:Issuer" "HotelBookingAPI"
   dotnet user-secrets set "Jwt:Audience" "HotelClient"
   ```

4. Verify the secrets are stored:

   ```bash
   dotnet user-secrets list
   ```

The committed `appsettings.json` contains placeholder values only.

## Database Setup

1. Make sure MySQL is running.

2. Apply the existing EF Core migrations to create the database:

   ```bash
   cd HotelBookingAPI/HotelBookingAPI
   dotnet ef database update
   ```

   > If you don't have the `dotnet-ef` tool installed globally, install it with:
   > ```bash
   > dotnet tool install --global dotnet-ef
   > ```

The first run will automatically seed an admin user.

## Running the Application

### Run the Backend

```bash
cd HotelBookingAPI/HotelBookingAPI
dotnet run
```

The API will start on `https://localhost:7001` and `http://localhost:5001` by default (check console output for the exact URLs).

Swagger UI is available in development mode at:

```
https://localhost:7001/swagger
```

### Run the Frontend

In a new terminal:

```bash
cd hotel-client
npm run dev
```

The React app will start at:

```
http://localhost:5173
```

The API is already configured to accept requests from this origin via CORS.

## Default Admin User

On first startup, the API seeds an administrator account:

- **Email:** `admin@hotel.com`
- **Password:** `Admin123!`
- **Role:** `Admin`

> Change these credentials in production.

## Important Notes

- **Never commit secrets.** `appsettings.json` in the repo should only contain placeholder values. Real values live in User Secrets.
- The frontend expects the API to be running on the default .NET dev URLs.
- The JWT token is read from an `access_token` cookie in the current implementation.
- Make sure MySQL is running before starting the backend.
- Build artifacts (`bin/`, `obj/`, `dist/`, `node_modules/`, `.vs/`) are excluded by `.gitignore`.

## Scripts Reference

### Backend

| Command | Description |
|---------|-------------|
| `dotnet restore` | Restore NuGet packages |
| `dotnet build` | Build the API |
| `dotnet run` | Run the API |
| `dotnet ef database update` | Apply database migrations |
| `dotnet ef migrations add <Name>` | Add a new migration |

### Frontend

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
