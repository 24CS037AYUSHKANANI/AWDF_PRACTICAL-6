const router = require("express").Router();
const {
  readTasks,
  addTask,
  changeTask,
  removeTask
} = require("../controllers/taskController");

router.get("/", readTasks);
router.post("/", addTask);
router.put("/:id", changeTask);
router.delete("/:id", removeTask);

module.exports = router;
