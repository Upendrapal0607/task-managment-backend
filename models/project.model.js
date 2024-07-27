const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  Task:[],
//   userId: {
//     type: String,
//   },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = { ProjectModel };
