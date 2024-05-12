const express = require("express");
const { Auth } = require("../middlewares/auth.middleware");
const { TaskModel } = require("../models/task.model");

const taskRoute = express.Router();
taskRoute.use(Auth);

taskRoute.get("/", async (req, res) => {
  try {
    const {page, limit } = req.query;
    const pageNumber = parseInt(page) || 1; // page come form query if not then by default 1
    const pageSize = parseInt(limit) || 12; // limit come form query if not then by default 12
    const totalTask = await TaskModel.countDocuments({userId: req.body.userId}); // it is use for count totle Movies
    const totalPages = Math.ceil(totalTask / pageSize); // logic for find total page

    const taskList = await TaskModel.find({userId: req.body.userId})
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json({ 
      taskList,
      page: pageNumber, 
      totalPages,
      totalTask, 
     });
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
