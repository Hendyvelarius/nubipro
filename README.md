# NubiPro

👋 Welcome to NubiPro!

We're excited to have you here. This repository contains the tools and resources you need to get started with NubiPro. Whether you're a developer, contributor, or just exploring, we hope you'll find everything you need in this documentation.

## About the Project

NubiPro is a robust full-stack web application designed to deliver a seamless user experience. Built with modern technologies, our stack includes:

- **Backend Framework**: Express.js, providing a powerful and flexible Node.js web application framework
- **Database**: PostgreSQL, ensuring reliable and scalable data storage
- **ORM**: Sequelize, offering elegant database abstraction and management
- **View Engine**: EJS (Embedded JavaScript templates) for dynamic HTML rendering

The application combines these technologies to create a cohesive and efficient platform, making it easy to maintain and scale.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- PostgreSQL (v12.0 or higher)
- npm (usually comes with Node.js)

## Project Structure

Here's an overview of the main directories in the project:
```
NubiPro/
├── config/         # Configuration files (database, environment variables)
├── controllers/    # Route controllers
├── models/        # Database models
├── routes/        # Application routes
├── views/         # EJS template files
├── public/        # Static files (CSS, JavaScript, images)
├── migrations/    # Database migrations
└── seeders/      # Database seeders
```

## Installation

Follow these steps to set up the project:

1. Clone the repository:
```bash
git clone https://github.com/your-username/nubipro.git
cd nubipro
```

2. Install dependencies:
```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory:
```
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=nubipro_db
DB_HOST=localhost
PORT=3000
```

2. Update database configuration in `config/config.json` if needed:
```json
{
    "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "nubipro_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
    }
}
```

## Database Setup

1. Create the database:
```bash
npx sequelize-cli db:create
```

2. Run migrations:
```bash
npx sequelize-cli db:migrate
```

3. Seed the database with initial data:
Run the following commands in order:

```bash
npx sequelize-cli db:seed --seed 20250108142048-initial-data-category
npx sequelize-cli db:seed --seed 20250108142054-initial-data-game
npx sequelize-cli db:seed --seed 20250108142102-initial-data-gamedetails
npx sequelize-cli db:seed --seed 20250108142116-initial-data-user
npx sequelize-cli db:seed --seed 20250108142122-initial-data-usergame
npx sequelize-cli db:seed --seed 20250108142110-initial-data-gamestatistic
```

Alternatively, you can run all seeds at once:
```bash
npx sequelize-cli db:seed:all
```

> Note: The seeding order is important to maintain data integrity and foreign key relationships.

## Running the Application

1. Start the development server:
```bash
npm run dev
```
or
```bash
npm start
```

2. Access the application at `http://localhost:3000`
