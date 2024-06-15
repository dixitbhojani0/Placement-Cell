import interviewModel from "../models/interview.js";
import studentModel from "../models/student.js";

// render add student page
export const addStudent = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.render("addStudent", {
                title: "Add Student",
                user: req.user
            });
        }
        return res.redirect("/");
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

// render edit student page
export const editStudent = async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.id);

        if (req.isAuthenticated()) {
            return res.render("editStudent", {
                title: "Edit Student",
                studentDetails: student,
                user: req.user
            });
        }
        return res.redirect("/");
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

// create student
export const createStudent = async (req, res) => {
    try {
        const { name, email, batch, phone, college, placementStatus, dsaScore, reactScore, webdevScore } = req.body;

        // check if student already exist
        const student = await studentModel.findOne({ email });
        if (student) {
            return res.redirect("/");
        }
        const newStudent = new studentModel({
            name,
            email,
            college,
            batch,
            phone,
            dsaScore,
            reactScore,
            webdevScore,
            placementStatus
        });
        await newStudent.save();

    } catch (err) {
        console.log(err);
    }
    return res.redirect('/');
}

// update student
export const updateStudent = async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.id);
        const { name, batch, college, placementStatus, dsaScore, reactScore, webdevScore } = req.body;

        if (!student) {
            console.log(err);
            return res.redirect("/");
        }

        student.name = name;
        student.college = college;
        student.batch = batch;
        student.dsaScore = dsaScore;
        student.reactScore = reactScore;
        student.webdevScore = webdevScore;
        student.placementStatus = placementStatus;

        student.save();
        return res.redirect("/");

    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

// Delete of student
export const deleteStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await studentModel.findById(studentId).populate("interviews");

        if (!student) {
            return;
        }

        const interviewsOfStudent = student.interviews;

        if (interviewsOfStudent.length > 0) {
            for (let interview of interviewsOfStudent) {
                await interviewModel.findOneAndUpdate(
                    { company: interview.company },
                    { $pull: { students: { student: studentId } } }
                )
            }
        }

        await student.deleteOne();
        return res.redirect("/");
    } catch (err) {
        console.log(err);
        return;
    }
}