import express from "express";
import { addStudent, createStudent, deleteStudent, editStudent, updateStudent } from "../controller/studentController.js";

const router = express.Router();

// rending add  Student page
router.get("/addStudent", addStudent);

// creating a new Student
router.post("/createStudent", createStudent);

// rendering edit page
router.get("/editStudent/:id", editStudent);

// updating the student
router.post("/updateStudent/:id", updateStudent);

// deleting a particular student
router.get("/deleteStudent/:studentId", deleteStudent);

export default router;