const Task = require("../models/Task")

const createTask = async (req,res) => {
    const {title, description, dueDate} = req.body

    try{
        const newTask = await Task.create({user:req.user, title,description,dueDate})

        res.status(201).json(newTask)
    }
    catch(error){
        res.status(400).json({message: "Failed to create task", error})
    }
}

const getTasks = async (req,res) => {
    try{
        const tasks = Task.find({user: req.user})
        res.status(201).json(tasks)
    }
    catch(error){
        res.status(400).json({message: "Failed to fetch tasks", error})
    }
}

const deleteTask = async (req,res) => {
    try{
        await Task.findByIdAndDelete(req.params.id)
        res.status(201).json({message: "Task successfully deleted"})
    }
    catch(error){
        res.status(400).json({message: "Failed to delete task",  error})
    }
}

const updateTask = async (req,res) => {
    try{
        await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(201).json({message: "Task successfully updated"})
    }
    catch(error){
        res.status(400).json({message: "Failed to update task", error})
    }
}

module.exports = {createTask, getTasks, deleteTask, updateTask}