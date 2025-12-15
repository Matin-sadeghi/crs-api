# Course Registration System (CRS) API

A comprehensive RESTful API for managing course registration, scheduling, and academic administration built with NestJS and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
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

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.x or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crs-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables))

4. Run the application:
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI_CONN=mongodb://localhost:27017/crs
PORT=3000
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

## 📚 API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:3000/api/docs
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

Your Name

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Database powered by [MongoDB](https://www.mongodb.com/)
- Documentation with [Swagger](https://swagger.io/)

---

For more information, visit the [API Documentation](http://localhost:3000/api/docs) when the server is running.
