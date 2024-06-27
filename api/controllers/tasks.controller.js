const _ = require("lodash");

const TaskModel = require("../models/tasks.model");

const foodController = {
  getOneTask: async (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res.json({ error: "You must provide the id of task" }).status(400);
    }

    const task = await TaskModel.findById(id);

    return res.json({ task }).status(200);
  },
  getAll: async (_req, res) => {
    const tasks = await TaskModel.find();
    return res.json({ tasks });
  },
  createTask: async (req, res) => {
    const bodyParams = _.pick(req.body, ["title", "description"]);

    if (!bodyParams.title || !bodyParams.description) {
      return res.json({ error: "You must provide all the fields" }).status(400);
    }

    try {
      let task = new TaskModel({ ...bodyParams });

      await task.save();

      return res.json({ task, success: true }).status(200);
    } catch (error) {
      console.log(error);
      return res
        .json({
          error: "Internal server error",
          message: error.message,
        })
        .status(500);
    }
  },
  deleteTask: async (req, res) => {
    const bodyParams = _.pick(req.body, ["id"]);

    if (!bodyParams.id) {
      return res.json({ error: "You must provide the id of task" }).status(400);
    }

    try {
      const task = await TaskModel.findByIdAndDelete(bodyParams.id);

      return res.json({ success: true, task }).status(200);
    } catch (error) {
      console.log(error);
      return res
        .json({
          error: "Internal server error",
          message: error.message,
          success: false,
        })
        .status(500);
    }
  },
  updateTask: async (req, res) => {
    const bodyParams = _.pick(req.body, ["title", "description", "id"]);

    if (!bodyParams.title || bodyParams.description || bodyParams.id) {
      return res.json({ error: "You must provide all the fields" }).status(400);
    }

    try {
      let task = await TaskModel.findOneAndUpdate(
        { _id: id },
        { ...bodyParams }
      );

      return res.json({ task, success: true }).status(200);
    } catch (error) {
      console.log(error);
      return res
        .json({
          error: "Internal server error",
          message: error.message,
        })
        .status(500);
    }
  },
};

module.exports = foodController;
