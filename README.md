# 🚀 RESTful Task Management API (Node.js & JWT)
A robust and complete API for task management (To-Do List), built with the MERN stack (Backend only) and designed following the REST architectural style. 

# Key Links

| Type | Links     |
| :-------- | :------- | 
| Repository | https://github.com/ron2702/node-task-api-mern |
| Live Demo | https://task-api-mern-portfolio.onrender.com |
| API Doc | https://task-api-mern-portfolio.onrender.com/api-docs/ |

# ✨ Key Features

This project was designed to follow best practices in backend development, focusing on security and maintainability.

- JWT Authentication: Full implementation of user registration (/register) and login (/login) using JSON Web Tokens for session management.
- Security with bcrypt: Passwords are securely hashed using bcrypt before being stored in MongoDB.
- Protected Routes: Implementation of Middleware to restrict access to all CRUD routes (/api/tasks) to authenticated users with a valid token.
- Modular Architecture: Code organization based on the MVC pattern (Models, Controllers, Routes), ensuring easy maintenance and readability.
- Data Persistence: Utilization of MongoDB Atlas and Mongoose for NoSQL database handling.
- API Documentation: Integration of Swagger UI (OpenAPI 3.0) to provide interactive, auto-generated documentation.

# 🛠️ Local Installation and Usage

Follow these steps to clone and run the project on your local machine:

## Requirements
- Node.js (version 18+)
- A running MongoDB instance (Atlas or Local)

Steps:

### 1. Clone the repository

``` bash
git clone https://github.com/ron2702/task-api-mern.git
cd task-api-mern
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure Environment Variables
Create a file named .env in the project root and add your credentials. (This file is ignored by Git for security.)

``` bash
PORT=4000
MONGO_URI=mongodb+srv://[USERNAME]:[PASSWORD]@cluster0.abcde.mongodb.net/tasks-db
JWT_SECRET=your_super_strong_secret_key_here_for_jwt
```

### 4. Run the server
The API will be running at http://localhost:4000.

``` bash
npm run dev
```

# 🔑 API Endpoints
Use Postman or the Swagger UI (http://localhost:4000/api-docs) to interact with the following endpoints.

## 1. Authentication (Token Generation)

| Method | Route     | Function                |
| :-------- | :------- | :------------------------- |
| POST | `/api/auth/register` | Creates a new user. |
| POST | `/api/auth/login` | Logs in and returns the JWT. |

## 2. Tasks (Requires Bearer Token)

| Method | Route     | Function                |
| :-------- | :------- | :------------------------- |
| POST | `/api/tasks` | Creates a task for the authenticated user. |
| GET | `/api/tasks` | Retrieves all tasks owned by the user. |
| GET | `/api/tasks/:id` | Retrieves a specific task. |
| PUT | `/api/tasks/:id` | Updates a task. |
| DELETE | `/api/tasks/:id` | Deletes a task. |

