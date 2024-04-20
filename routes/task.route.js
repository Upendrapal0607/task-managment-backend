const express = require("express");
const { Auth } = require("../middlewares/auth.middleware");
const { TaskModel } = require("../models/task.model");

const taskRoute = express.Router();
taskRoute.use(Auth);

taskRoute.get("/", async (req, res) => {
  try {
    const taskList = await TaskModel.find({ userId: req.body.userId });

    res.status(200).json({ taskList });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});
taskRoute.post("/addtask", async (req, res) => {
  const data = req.body;
  console.log({ data });
  try {
    const CreatedTask = new TaskModel(data);
    console.log({ CreatedTask });
    await CreatedTask.save();
    res.status(200).json({ message: "task added" });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

taskRoute.patch("/update/:paramId", async (req, res) => {
  const { paramId } = req.params;
  // console.log(paramId)
  console.log({ body: req.body });
  try {
    const checkProduct = await TaskModel.findOne({ _id: paramId });
    if (checkProduct) {
      if (checkProduct.userId == req.body.userId) {
        await TaskModel.findByIdAndUpdate({ _id: paramId }, req.body);
        res.status(200).json({ msg: `task has been updated` });
      } else {
        res.status(200).json({ msg: `you are not authorized` });
      }
    } else {
      res.status(200).json({ msg: "task is not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

taskRoute.delete("/delete/:paramId", async (req, res) => {
  const { paramId } = req.params;
  try {
    const checkProduct = await TaskModel.findOne({ _id: paramId });
    if (checkProduct) {
      if (checkProduct.userId == req.body.userId) {
        await TaskModel.findByIdAndDelete({ _id: paramId });
        res.status(200).json({ msg: `task has been deleted` });
      } else {
        res.status(200).json({ msg: `you are not authorized` });
      }
    } else {
      res.status(200).json({ msg: "task is not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

module.exports = {
  taskRoute,
};
