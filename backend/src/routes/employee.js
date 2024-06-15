import express from "express";
import { createEmployee, createSession, destroySession, profile, signIn, signUp, updateEmployee } from "../controller/employeeController.js";
import passport from "../config/passport.js";
import { dashboard } from "../controller/dashboardController.js";
import { downloadCSVReport } from "../controller/reportController.js";

const router = express.Router();

// router for checking up the profile
router.get("/profile", passport.checkAuthentication, profile);

//updating user profile
router.post("/updateEmployee", passport.checkAuthentication, updateEmployee);

// route for dashboard
router.get("/dashboard", dashboard);

// router for sign in page
router.get("/", signIn);

// route for sign up page
router.get("/signUp", signUp);

// route for creating a new User
router.post("/create", createEmployee);

// use passport as middleware to authenticate
router.post(
    "/createSession",
    passport.authenticate("local", { failureRedirect: "/" }),
    createSession
);

// route for logout button
router.get("/signOut", destroySession);

// route for downloading csv reports
router.get("/download", downloadCSVReport);

export default router;
