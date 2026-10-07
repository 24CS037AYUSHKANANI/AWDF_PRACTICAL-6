require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectMongo = require("./src/config/mongo");
const taskRouter = require("./src/routes/taskRouter");
const apiError = require("./src/middlewares/apiError");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | 24CS037 | ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    student: "Ayush Kanani",
    studentId: "24CS037",
    practical: "AWDF Practical 6",
    service: "Task Manager API"
  });
});

app.use("/tasks", taskRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    studentId: "24CS037",
    message: "Route does not exist"
  });
});

app.use(apiError);

async function boot() {
  try {
    await connectMongo();

    app.listen(PORT, () => {
      console.log("----------------------------------------");
      console.log("AWDF Practical 6");
      console.log("Ayush Kanani | 24CS037");
      console.log(`Server: http://localhost:${PORT}`);
      console.log("----------------------------------------");
    });
  } catch (error) {
    console.error("Could not start server:", error.message);
    process.exit(1);
  }
}

boot();
