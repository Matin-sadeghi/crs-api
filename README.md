# Course Registration System (CRS) API

A comprehensive RESTful API for managing course registration, scheduling, and academic administration built with NestJS and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How to Run the Project (Step by Step)](#how-to-run-the-project-step-by-step)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Modules](#modules)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)

## ✨ Features

- **User Management**: Support for multiple user roles (Admin, Student, Professor)
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Course Management**: Create and manage lessons, prerequisites, and course units
- **Classroom Management**: Manage classrooms with capacity and faculty associations
- **Section Scheduling**: Create sections with time schedules and conflict detection
- **Student Enrollment**: Manage student registrations and major assignments
- **Faculty Management**: Handle professor profiles and faculty associations
- **Swagger Documentation**: Interactive API documentation
- **Data Validation**: Comprehensive input validation using class-validator
- **MongoDB Integration**: Efficient data storage with Mongoose ODM

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js framework
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) with Passport
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Security**: bcrypt for password hashing

## 📁 Project Structure

```
src/
├── admin/          # Admin management module
├── auth/           # Authentication & authorization
├── classroom/      # Classroom management
├── faculty/        # Faculty management
├── lesson/         # Course/lesson management
├── major/          # Major/degree program management
├── professor/      # Professor management
├── section/        # Section scheduling and enrollment
├── student/        # Student management
├── user/           # User management
├── seed/           # Database seeding utilities
└── utils/          # Utility functions and enums
```

## 🚀 How to Run the Project (Step by Step)

This guide walks you through setting up and running the CRS API from scratch.

---

### Step 1: Install Node.js

You need **Node.js v20.x or higher** (includes npm).

#### Option A: Linux (Ubuntu/Debian)

```bash
# Using NodeSource (recommended for v20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version   # Should show v20.x.x
npm --version    # Should show 10.x.x or higher
```

#### Option B: macOS

```bash
# Using Homebrew (install from https://brew.sh if needed)
brew install node@20

# Or use nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# Restart terminal, then:
nvm install 20
nvm use 20

# Verify
node --version
npm --version
```

#### Option C: Windows

1. Download the **LTS** installer from [nodejs.org](https://nodejs.org/) (v20 or higher).
2. Run the installer and follow the steps (ensure "Add to PATH" is checked).
3. Open a new Command Prompt or PowerShell and run:

```bash
node --version
npm --version
```

---

### Step 2: Install MongoDB

The API uses MongoDB as its database. You can run it locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud).

#### Option A: Linux (Ubuntu/Debian)

```bash
# Import MongoDB public key and add repository
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod   # Start on boot

# Verify (optional)
mongosh --eval "db.runCommand({ ping: 1 })"
```

#### Option B: macOS

```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB (run in background)
brew services start mongodb-community@7.0

# Verify (optional)
mongosh --eval "db.runCommand({ ping: 1 })"
```

#### Option C: Windows

1. Download the MongoDB Community Server installer from [MongoDB Download Center](https://www.mongodb.com/try/download/community).
2. Run the installer and choose "Complete". Optionally install MongoDB Compass (GUI).
3. MongoDB is usually installed at `C:\Program Files\MongoDB\Server\7.0\bin`. Add it to your PATH or run from that folder:
   - Start the server: `mongod --dbpath C:\data\db` (create `C:\data\db` if needed).

#### Option D: MongoDB Atlas (Cloud – no local install)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a free cluster and get your **connection string** (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/crs`).
3. You will use this URL in the `.env` file in Step 5 instead of `mongodb://localhost:27017/crs`.

---

### Step 3: Verify Installations

Before continuing, ensure everything is installed:

```bash
node --version    # v20.x.x or higher
npm --version     # 10.x.x or higher
mongosh --version # 2.x.x (optional; not needed if using Atlas only)
```

If using local MongoDB, ensure the service is running (`sudo systemctl status mongod` on Linux, or check Services on Windows).

---

### Step 4: Clone the Repository

```bash
git clone <repository-url>
cd crs-api
```

Replace `<repository-url>` with your actual repo URL (e.g. `https://github.com/your-username/crs-api.git`).

---

### Step 5: Install Project Dependencies

**Where to run:** Inside the project folder (the `crs-api` directory—the same folder that contains `package.json`). If you just cloned and ran `cd crs-api`, you are already there.

```bash
# Make sure you're in the project root (you should see package.json here)
# pwd should show something like: /path/to/crs-api
npm install
# or
npm i
```

This installs NestJS, Mongoose, and all other dependencies from `package.json`.

---

### Step 6: Configure Environment Variables

Create a `.env` file in the **root** of the project (same folder as `package.json`):

```bash
# Linux/macOS
touch .env

# Then open .env in your editor and add:
```

Add the following (adjust if you use Atlas or different port):

```env
MONGO_URI_CONN=mongodb://localhost:27017/crs
PORT=3001
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

- **Local MongoDB**: Use `mongodb://localhost:27017/crs`.
- **MongoDB Atlas**: Use your Atlas connection string (e.g. `MONGO_URI_CONN=mongodb+srv://user:password@cluster.mongodb.net/crs`).
- **JWT_SECRET**: Replace `your-secret-key-here` with a long, random string for production.

---

### Step 7: Run the Application

**Development mode** (with hot-reload):

```bash
npm run start:dev
```

You should see something like:

```
[Nest] ... LOG [NestApplication] Nest application successfully started
[Nest] ... LOG Application is running on: http://localhost:3001
```

**Production mode** (build then run):

```bash
npm run build
npm run start:prod
```

---

### Step 8: Verify the API

1. **Health check**: Open in browser or with curl:
   - `http://localhost:3001` (or the port you set in `.env`).

2. **Swagger API docs**:
   - Open: **http://localhost:3001/api/docs**

3. **Next:** Run the seed (Step 9) so you can log in. Default credentials are **username:** `admin`, **password:** `admin`.

---

### Step 9: Run Seed (Required)

**You need to run the seed** after the project is running to create the initial admin user. Without this, you cannot log in.

```bash
curl -X POST http://localhost:3001/seed/admin-user
```

Or use the same endpoint from the Swagger UI at `http://localhost:3001/api/docs`.

**Default admin login credentials:**

| Field    | Value   |
| -------- | ------- |
| Username | `admin` |
| Password | `admin` |

Use these to log in at `POST /auth/login` or via Swagger.

---

### Quick Reference

| Step | Action                                     | Command / Action                                                                     |
| ---- | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| 1    | Install Node.js (v20+)                     | See Step 1 for your OS                                                               |
| 2    | Install MongoDB                            | See Step 2 (local or Atlas)                                                          |
| 3    | Verify                                     | `node -v`, `npm -v`                                                                  |
| 4    | Clone repo                                 | `git clone <url> && cd crs-api`                                                      |
| 5    | Install dependencies (in `crs-api` folder) | `npm install` or `npm i`                                                             |
| 6    | Create `.env`                              | Copy env vars from Step 6                                                            |
| 7    | Run app                                    | `npm run start:dev`                                                                  |
| 8    | Open docs                                  | http://localhost:3001/api/docs                                                       |
| 9    | Run seed (required)                        | `POST http://localhost:3001/seed/admin-user` — then login with **admin** / **admin** |

---

### Troubleshooting

- **"Cannot connect to MongoDB"**: Ensure MongoDB is running locally, or that your Atlas URL, username, and password in `.env` are correct and the IP is allowed in Atlas.
- **Port already in use**: Change `PORT` in `.env` (e.g. to `3001`).
- **Module not found**: Run `npm install` again from the project root.
- **Permission denied (Linux)**: Use `sudo` only where indicated (e.g. for installing Node.js or MongoDB), not for `npm install` or running the app.

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI_CONN=mongodb://localhost:27017/crs
PORT=3001
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

## 📚 API Documentation

Once the server is running, access the Swagger documentation at:

```
http://localhost:3001/api/docs
```

The API documentation provides:

- Interactive API explorer
- Request/response schemas
- Authentication testing
- Example payloads

## 📦 Modules

### User Module

- User registration and management
- Role-based user profiles (Admin, Student, Professor)
- User authentication

### Auth Module

- JWT token generation and validation
- Login/logout functionality
- Role-based access control (RBAC)
- Protected routes with guards

### Lesson Module

- Course/lesson creation and management
- Prerequisite management
- Lesson types (General, Specialized, Mandatory, Elective, Lab)
- Unit management

### Section Module

- Section creation with scheduling
- Time slot conflict detection
- Classroom assignment
- Professor assignment
- Student enrollment management

### Classroom Module

- Classroom management
- Capacity tracking
- Faculty association
- Room number validation

### Student Module

- Student profile management
- Major assignment
- Student ID generation

### Professor Module

- Professor profile management
- Education credentials
- Faculty association

### Faculty Module

- Faculty/department management

### Major Module

- Academic major/degree program management

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Login**: POST `/auth/login`
   - Returns JWT token and user information

2. **Protected Routes**: Include token in Authorization header

   ```
   Authorization: Bearer <your-jwt-token>
   ```

3. **Roles**:
   - `ADMIN`: Full system access
   - `PROFESSOR`: Professor-specific operations
   - `STUDENT`: Student-specific operations

## 💾 Database Schema

### Key Entities

- **User**: Base user information with role-based profiles
- **Student**: Student-specific data with major association
- **Professor**: Professor data with faculty and education info
- **Admin**: Administrative user data
- **Lesson**: Course information with prerequisites
- **Section**: Class sections with schedules and enrollments
- **Classroom**: Room information with capacity
- **Faculty**: Academic faculty/department
- **Major**: Academic major programs

### Relationships

- User → Student/Professor/Admin (one-to-one)
- Section → Professor, Classroom, Lesson (many-to-one)
- Section → Students (many-to-many)
- Student → Major (many-to-one)
- Professor → Faculty (many-to-one)
- Classroom → Faculty (many-to-one)

## 📡 API Endpoints

### Authentication

- `POST /auth/login` - User login

### Lessons

- `GET /lesson-admin` - Get all lessons
- `GET /lesson-admin/:id` - Get lesson by ID
- `POST /lesson-admin` - Create lesson (Admin only)
- `PUT /lesson-admin/:id` - Update lesson (Admin only)
- `DELETE /lesson-admin/:id` - Delete lesson (Admin only)

### Sections

- `GET /section` - Get all sections
- `GET /section/:id` - Get section by ID
- `POST /section` - Create section (Admin only)
- `PUT /section/:id` - Update section (Admin only)
- `DELETE /section/:id` - Delete section (Admin only)

### Classrooms

- `GET /classroom` - Get all classrooms
- `GET /classroom/:id` - Get classroom by ID
- `POST /classroom` - Create classroom (Admin only)
- `PUT /classroom/:id` - Update classroom (Admin only)
- `DELETE /classroom/:id` - Delete classroom (Admin only)

### Students

- `GET /student` - Get all students
- `POST /student` - Create student

### Professors

- `GET /professor` - Get all professors
- `POST /professor` - Create professor

### Faculties

- `GET /faculty` - Get all faculties
- `POST /faculty` - Create faculty

### Majors

- `GET /major` - Get all majors
- `POST /major` - Create major

## 🎯 Key Features

### Section Scheduling

- Automatic conflict detection for classroom time slots
- Support for multiple schedules per section
- Time format validation (HH:mm, 24-hour format)
- Day-of-week enum validation

### Data Validation

- Comprehensive input validation
- Regex patterns for time formats
- Enum validation for roles and types
- MongoDB ObjectId validation

### Security

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control
- CORS configuration

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Scripts

```bash
# Development
npm run start:dev      # Start in watch mode

# Production
npm run build          # Build for production
npm run start:prod     # Start production server

# Code quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the UNLICENSED License.

## 👤 Author

Matin Sadeghi

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Database powered by [MongoDB](https://www.mongodb.com/)
- Documentation with [Swagger](https://swagger.io/)

---

For more information, visit the [API Documentation](http://localhost:3001/api/docs) when the server is running.
