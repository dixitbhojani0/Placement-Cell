import studentModel from "../models/student.js"
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const downloadCSVReport = async (req, res) => {
    try {
        const students = await studentModel.find({}).populate("interviews");
        let report =
        "student Id, Student name,Student college, Student email, Student status, DSA Final Score, WebD Final Score, React Final Score, Interview date, Interview company, Interview result";
        let studentData1 = "";

        for(let student of students) {
            studentData1 =
                student.id +
                "," +
                student.name +
                "," +
                student.college +
                "," +
                student.email +
                "," +
                student.placementStatus +
                "," +
                student.dsaScore +
                "," +
                student.webdevScore +
                "," +
                student.reactScore;
            
            console.log(student);
            if(student.interviews.length) {
                for (let interview of student.interviews) {
                    let studentData2 = "";
                    studentData2 +=
                      "," +
                      interview.date.toString() +
                      "," +
                      interview.company +
                      "," +
                      interview.result;
                    report += "\n" + studentData1 + studentData2;
                }
            }

            // const __filename = fileURLToPath(import.meta.url);
            // const __dirname = dirname(__filename);
            const uploadsDir = path.resolve('public', 'uploads');
            
            if (!fs.existsSync(uploadsDir)) {
                console.log(uploadsDir);
                fs.mkdirSync(uploadsDir, { recursive: true });
            }
            const filePath = path.resolve(uploadsDir, `studentsReport-${Date.now()}.csv`);

            // fs.mkdir('uploads');
            fs.writeFile(filePath, report, (err) => {
                    if(err) {
                        console.log(err);
                        return res.redirect("/");
                    }
                    return res.download(filePath);
                }
            )
        }
    } catch (err) {
        console.log(err);
    }
    return res.redirect("/");
}