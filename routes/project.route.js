const express = require("express");
const { Auth } = require("../middlewares/auth.middleware");
const { ProjectModel } = require("../models/project.model");
// const { ProjectModel } = require("../models/task.model");

const projectRoute = express.Router();
projectRoute.use(Auth);

projectRoute.get("/", async (req, res) => {
  try {
    const projectList = await ProjectModel.find()
    res.status(200).json({ 
      projectList, 
     });
  } catch (error) {
    res.status(400).json({error, message: "error accurse getting project" });
  }
});


projectRoute.get("/task", async (req, res) => {
    try {
      const taskList = await ProjectModel.aggregate([
        { $unwind: "$Task" },
        { $group: { _id: null, allTasks: { $push: "$Task" } } }, // Group all tasks into a single array
        { $project: { _id: 1, allTasks: 1 } } // Project the result, exclude _id
    ]);
    
    
    //   const taskList = await ProjectModel.aggregate([
    //     { $project: { Task: 1, _id: 1} }
    // ])
    res.status(200).json({ 
        taskList: taskList.length > 0 ? taskList[0].allTasks : []  
     });

  } catch (error) {
    res.status(400).json({error, message: "error accurse getting task" });
  }
});
projectRoute.post("/add", async (req, res) => {
  const data = req.body;
  try {
    const CreatedProject = new ProjectModel(data);
    await CreatedProject.save();
    res.status(200).json({ message: "new project created succesful" });
  } catch (error) {
    res.status(400).json({error, message: "error accurse addign project" });
  }
});

projectRoute.patch("/update/:paramId", async (req, res) => {
  const { paramId } = req.params;

  try {
    const checkProject = await ProjectModel.findOne({ _id: paramId });
  

    if (checkProject) {
        await ProjectModel.findByIdAndUpdate({ _id: paramId }, req.body);
        res.status(200).json({ message: `project has been updated` });

    } else {
      res.status(200).json({ message: "task is not found" });
    }
  } catch (error) {
    res.status(400).json({error, message: "error accurse updating project" });
  }
});

projectRoute.delete("/delete/:paramId", async (req, res) => {
  const { paramId } = req.params;
  try {
    const checkProject= await ProjectModel.findOne({ _id: paramId });
    if (checkProject) {
        await ProjectModel.findByIdAndDelete({ _id: paramId });
        res.status(200).json({ message: `project has been deleted` });
      
    } else {
      res.status(200).json({ message: "task is not found" });
    }
  } catch (error) {
    res.status(400).json({error, message: "error accurse deleting project" });
  }
});

module.exports = {
  projectRoute,
};
