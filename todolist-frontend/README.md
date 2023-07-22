Front End Readme:
# Frontend for ToDo Application
## Description
This project is the frontend part of a simple to-do application built with React.js. It includes features such as user authentication, task creation, task assignment, email notifications, and more.
## Technologies Used
* React.js - Main library for building the UI
* Redux - State management
* Axios - API requests
* Material-UI - Component library for building user interface
* React Router - Routing library
* JSON Web Tokens (JWT) - User authentication
* Moment.js - Date manipulation library
* Formik - Form handling library
* Yup - Object schema validation
* LocalStorage - Session management
## How to Run
1. Clone this repository
2. Run `npm install` to install all dependencies
3. Run `npm start` to start the application
Make sure to also run the backend server alongside this frontend application.


Back end
# Backend for ToDo Application
## Description
This project is the backend part of a simple to-do application built with Node.js and Express.js. It includes features such as user authentication, task creation, task assignment, email notifications, and more.
## Technologies Used
* Node.js - JavaScript runtime environment
* Express.js - Web application framework
* MongoDB - Database
* Mongoose - Object Data Modeling (ODM) library for MongoDB and Node.js
* bcrypt.js - Library for hashing and salting passwords
* JSON Web Tokens (JWT) - User authentication
* Nodemailer - Sending email notifications
* Dotenv - Loading environment variables
## How to Run
1. Clone this repository
2. Run `npm install` to install all dependencies
3. Create a `.env` file with your environment variables (e.g., database URI, JWT secret, email service credentials)
4. Run `npm start` to start the application
Make sure to also run the frontend server alongside this backend application.
## API Endpoints
* `/api/users/register` - Register a new user
* `/api/users/login` - Login a user
* `/api/users/info` - Get current user information
* `/api/toDoItems` - Get, create, update, delete tasks
* `/api/toDoItems/createdBy/:userId` - Get tasks created by a specific user
## Contributors
Cheh Yek Teng
Woon Zhien
Wang Jiantao