const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskControllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/",auth,createTask)
router.get("/",auth,getTasks)
router.delete("/:id",auth,deleteTask)
router.put("/:id",auth,updateTask)

module.exports = router