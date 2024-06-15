import studentModel from "../models/student.js"
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const downloadCSVReport = async (req, res) => {
    try {
        const students = await studentModel.find({}).populate("interviews");
        let report = "student Id, Student name,Student college, Student email, Student status, DSA Final Score, WebD Final Score, React Final Score, Interview date, Interview company, Interview result";

        for (let student of students) {
            let studentData1 =
                student.id + "," +
                student.name + "," +
                student.college + "," +
                student.email + "," +
                student.placementStatus + "," +
                student.dsaScore + "," +
                student.webdevScore + "," +
                student.reactScore;

            if (student.interviews.length) {
                for (let interview of student.interviews) {
                    let studentData2 = 
                        "," + interview.date.toString() + 
                        "," + interview.company + 
                        "," + interview.result;
                    report += "\n" + studentData1 + studentData2;
                }
            }
        }

        const uploadsDir = path.resolve('public', 'uploads');

        if (!fs.existsSync(uploadsDir)) {
            console.log(uploadsDir);
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const filePath = path.resolve(uploadsDir, `studentsReport-${Date.now()}.csv`);

        fs.writeFile(filePath, report, (err) => {
            if (err) {
                console.error(err);
                return res.redirect("/");
            }
            return res.download(filePath, (err) => {
                if (err) {
                    console.error(err);
                    return res.redirect("/");
                }
            });
        })
    } catch (err) {
        console.error(err);
        res.redirect("/");
    }
}