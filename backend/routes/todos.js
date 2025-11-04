import { Router } from "express";
import { Tasks } from "../data/store.js";
import auth from "../middleware/auth.js"
import mongoose from 'mongoose';
const ObjectId = mongoose.ObjectId;

const taskRoutes =  Router();

taskRoutes.post("/task", auth, async (req, res) => {
  const { title, description } = req.body;

  try{
    const newTask = await Tasks.create({
      title: title,
      description: description,
      userId: req.userId
    });
    res.status(201).json({
      message: "Task created successfully!",
      task: newTask
    });
  } catch(e) {
    res.status(404).json({
      message: "Task cannot be created",
      error: e.message
    });
  }
});

taskRoutes.get("/task", auth, async (req, res) => {

  try {
    const tasks = await Tasks.find({ userId: req.userId });
    return res.status(200).json({
        tasks
      });
    } catch(e){
    return res.status(404).json({
      message: "Error while finding tasks",
      error: e.message
    });
  }
});

taskRoutes.get("/task/:id", auth, async (req, res) => {
  try{
    const task = await Tasks.findById(req.params.id);
    if(task.userId.toString() !== req.userId){
      return res.status(403).json({
        message:"Forbidden"
      });
    }
    return res.status(200).json(task);
   
  } catch(e) {
    return res.status(400).json({
      message: "Error while fetching todo",
      error: e.message
    });
  }
});

taskRoutes.put("/task/:id", auth, async (req, res) => {
  try{
    const task = await Tasks.findById(req.params.id);
    if(task.userId.toString() !== req.userId){
      return res.status(403).json({
        message:"Forbidden"
      });
    }

    const newTask = await Tasks.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
    });

    return res.status(200).json(newTask)
  } catch(e) {
    return res.status(400).json({
      message: "Error while updating task",
      error: e.message
    });
  }
});

taskRoutes.delete("/task/:id", auth, async (req, res) => {
  try{
    const task = await Tasks.findById(req.params.id);

    if(!task){
      return res.status(404).json({
        message: "Task doesn't exist"
      });
    }

    if(task.userId.toString() !== req.userId){
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    const deletedTodo = await Tasks.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Task deleted successfully",
      deletedTodo
    });
  } catch(e) {
    return res.status(400).json({
      message:"Error while deleting task",
      error: e.message
    });
  }
});


export default taskRoutes;

