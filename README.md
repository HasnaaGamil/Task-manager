# Task Manager API

## Overview
A simple Task Manager application built with Node.js, Express, and MongoDB. It allows users to perform CRUD operations on tasks, mark them as completed/incomplete, and filter by status. User authentication is included to ensure only authorized users can manage their tasks.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Approach ](#approach)
- [Environment Variables](#environment-variables)
- [Contact](#Contact)

## Features
- User registration and login with JWT authentication
- Create, read, update, and delete tasks
- Mark tasks as completed or incomplete
- Filter tasks by their completion status
- Secure and scalable architecture
## Installation
- Clone the repository:
  https://github.com/HasnaaGamil/Task-manager.git
- run node src/app.js

## Technologies Used
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT

## API Endpoints
### Auth Routes
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login a user

### Task Routes (Protected)
- `POST /api/tasks` – Create a new task
- `GET /api/tasks` – Retrieve all tasks for the authenticated user
- `PUT /api/tasks/:taskId` – Update a task by ID
- `DELETE /api/tasks/:taskId` – Delete a task by ID
- `GET /api/tasks/filter` – Filter all tasks based on the status for the authenticated user

## Approach
The code is structured using the MVC architecture:
- **Models**: Define data structures for `User` and `Task`.
- **Controllers**: Implement business logic and interactions with models.
- **Routes**: Define API endpoints and link them to controllers.
- **Middleware**: Authenticate and protect routes using JWT tokens.

## Environment Variables
The following environment variables need to be set up in your `.env` file:
MONGO_URI=mongodb+srv://hasnaagamil:iyBELvyJWJZrusMu@cluster0.0w8bu.mongodb.net/task_manager
JWT_SECRET=mySuperSecretKey12345!
PORT=5000


## Contact
Maintained by [Hasnaa Gamil](https://github.com/HasnaaGamil).

