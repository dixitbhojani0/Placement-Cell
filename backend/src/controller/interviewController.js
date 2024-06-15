import interviewModel from "../models/interview.js";
import studentModel from "../models/student.js";

export const addInterview = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.render("addInterview", {
                title: "Schedule An Interview",
                user: req.user
            });
        }
    } catch (err) {
        console.log(err);
    }
    return res.redirect("/");
}

// creating a new interview
export const createInterview = async (req, res) => {
    try {
        const { company, date } = req.body;

        const newInterview = new interviewModel({
            company,
            date
        });

        await newInterview.save();
    } catch (err) {
        console.log(err);
    }
    return res.redirect('/dashboard');
}

// Enrolling student in the interview
export const enrollInInterview = async (req, res) => {
    try {
        const interview = await interviewModel.findById(req.params.id);
        if (!interview) {
            return res.redirect("/");
        }
        const { email, result } = req.body;
        const student = await studentModel.findOne({ email });
        if (!student) {
            return res.redirect("/");
        }

        // check if already enrolled
        const alreadyEnrolled = await interviewModel.findOne({ "students.student": student._id });

        // preventing student from enrolling in same company more than once
        if (alreadyEnrolled && alreadyEnrolled.company === interview.company) {
            req.flash(
                "error",
                `${student.name} already enrolled in ${interview.company} interview!`
            );
            return res.redirect("/");
        }

        // updating students field of interview by putting reference of newly enrolled student
        await interview.updateOne({
            $push: { students: { student: student.id, result: result } }
        });

        // updating interview of student
        await student.updateOne({
            $push: {
                interviews: { company: interview.company, date: interview.date, result: result }
            }
        });

        // req.flash(
        //     "success",
        //     `${student.name} enrolled in ${interview.company} interview!`
        // );
    } catch (err) {
        console.log(err);
        console.log("error", "Error in enrolling interview!");
    }
    return res.redirect("/");
}

// deallocating students from an interview
export const deallocateStudent = async (req, res) => {
    try {
        const { studentId, interviewId } = req.params;

        // find the interview
        const interview = await interviewModel.findById(interviewId);

        if (interview) {
            // remove reference of student from interview schema
            await interviewModel.findOneAndUpdate(
                { _id: interviewId },
                { $pull: { students: { student: studentId } } }
            );

            // remove interview from student's schema using interview's company
            await studentModel.findByIdAndUpdate(
                { _id: studentId },
                { $pull: { interviews: { company: interview.company } } }
            );
        }
    } catch (err) {
        console.log("error", "Couldn't deallocate from interview");
    }
    return res.redirect("/");
}