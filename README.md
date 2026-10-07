# AWDF Practical 6 - Full Stack Task Manager

Student: Ayush Kanani
Roll No.: 24CS037
Course: Advanced Web Development Frameworks (ITUE301)

This project connects a React client with an Express/Mongoose API and MongoDB.

## Main flow

React UI
   |
   | fetch()
   v
Express API :5000
   |
   | Mongoose
   v
MongoDB

## Project layout

```text
24CS037_awdf_practical6/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── mongo.js
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   ├── middlewares/
│   │   │   └── apiError.js
│   │   ├── models/
│   │   │   └── Task.js
│   │   └── routes/
│   │       └── taskRouter.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── index.js
│
├── client/
│   ├── src/
│   │   ├── hooks/
│   │   │   └── useTasks.js
│   │   ├── lib/
│   │   │   └── taskApi.js
│   │   ├── ui/
│   │   │   ├── AddTask.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── Notice.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 1. Start the backend

```bash
cd server
npm install
```

Create `server/.env` from `.env.example`.

For MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/awdf_24cs037?retryWrites=true&w=majority
PORT=5000
```

Then:

```bash
npm start
```

The API runs at:

```text
http://localhost:5000
```

## 2. Start the React client

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## API endpoints

```text
GET    /tasks
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id
```

## End-to-end check

Create a task from React, edit it, delete it, and refresh the page. The list is loaded again from MongoDB through the backend, so refresh should not remove saved tasks.

The UI also shows loading/error feedback and asks for confirmation before deletion.

## GitHub

Suggested repository:

```text
task-manager-fullstack-24cs037
```

Suggested integration commit:

```text
feat: connect React task manager with MongoDB API
```

Never commit `server/.env`.

## Deployment

GitHub is used for source control. For a deployed version, the API can be hosted on a Node-compatible service and the React client on a static frontend host. Set the MongoDB URI and deployed API URL as environment variables on the respective platforms.
