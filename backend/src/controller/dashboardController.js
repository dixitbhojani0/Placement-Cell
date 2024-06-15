import interviewModel from "../models/interview.js";
import studentModel from "../models/student.js";

export const dashboard = async (req, res) => {
    try {
        if(req.isAuthenticated()) {
            // populating all students with interviews
            const students = await studentModel.find({}).populate("interviews");

            // populating all interviews with students
            const interviews = await interviewModel.find({}).populate("students.student");

            return res.render("dashboard", {
                title: "Dashboard",
                allStudents: students,
                allInterviews: interviews,
                user: req.user
            })
        }
        return res.redirect("/");
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}