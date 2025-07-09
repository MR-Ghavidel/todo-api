# To-Do List API

A simple and robust RESTful API for managing a to-do list, built with Node.js, Express, and MongoDB. This project covers all fundamental CRUD (Create, Read, Update, Delete) operations and serves as a solid foundation for backend development practices.

---

## Features

- ✅ **Create** a new task.
- ✅ **Read** all tasks from the database.
- ✅ **Read** a single task by its unique ID.
- ✅ **Update** an existing task's content and completion status.
- ✅ **Delete** a task from the database.

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Environment Variables:** `dotenv` for secure configuration management.
- **Version Control:** Git & GitHub

---

## API Endpoints

The base URL for the API is `http://localhost:3000`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/todos` | Retrieve all tasks. |
| `GET` | `/todos/:id` | Retrieve a single task by its ID. |
| `POST` | `/todos` | Create a new task. |
| `PUT` | `/todos/:id` | Update an existing task. |
| `DELETE`| `/todos/:id` | Delete a task. |

---

## How to Run Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/MR-Ghavidel/todo-api.git](https://github.com/MR-Ghavidel/todo-api.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd todo-api
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the root directory and add your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```
5.  Start the server:
    ```bash
    node index.js
    ```