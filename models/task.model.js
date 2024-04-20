const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: String,
  },
  privority: {
    type: String,
    default: "Heigh privority",
  },
  userId: {
    type: String,
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = { TaskModel };
