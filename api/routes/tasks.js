const { Router } = require("express");

const taskController = require("../controllers/tasks.controller");

const router = Router();

router.get("/", taskController.getAll);
router.get("/one/:id", taskController.getOneTask);
router.post("/create", taskController.createTask);
router.delete("/delete", taskController.deleteTask);
router.put("/update", taskController.updateTask);

module.exports = router;
