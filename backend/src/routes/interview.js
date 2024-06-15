import express from "express";
import { addInterview, createInterview, deallocateStudent, enrollInInterview } from "../controller/interviewController.js";

const router = express.Router();

// redering add interview page
router.get("/addInterview", addInterview);

// creating a new interview
router.post("/createInterview", createInterview);

// enrolling student in an interview
router.post("/enrollInInterview/:id", enrollInInterview);

// deallocate the student from the interview
router.get("/deallocate/:studentId/:interviewId", deallocateStudent);

export default router;