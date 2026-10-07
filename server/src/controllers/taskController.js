const mongoose = require("mongoose");
const Task = require("../models/Task");

const id = "24CS037";

const notFound = res => res.status(404).json({
  success: false,
  studentId: id,
  message: "Task was not found"
});

async function readTasks(req, res, next) {
  try {
    const items = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      studentId: id,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
}

async function addTask(req, res, next) {
  try {
    const item = await Task.create(req.body);

    res.status(201).json({
      success: true,
      studentId: id,
      message: "Task created successfully",
      data: item
    });
  } catch (error) {
    next(error);
  }
}

async function changeTask(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return notFound(res);
    }

    const item = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!item) return notFound(res);

    res.status(200).json({
      success: true,
      studentId: id,
      message: "Task updated successfully",
      data: item
    });
  } catch (error) {
    next(error);
  }
}

async function removeTask(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return notFound(res);
    }

    const item = await Task.findByIdAndDelete(req.params.id);

    if (!item) return notFound(res);

    res.status(200).json({
      success: true,
      studentId: id,
      message: "Task deleted successfully",
      data: item
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  readTasks,
  addTask,
  changeTask,
  removeTask
};
