import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        students: [
            {
                student: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Student",
                },
                result: {
                    type: String,
                    enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"],
                    default: "Applied",
                },
            }
        ],
        date: {
            type: String,
            required: true,
            default: Date.now(),
        }
    },
    { 
        timestamps: true
    }
);

const interviewModel = mongoose.model("Interview", interviewSchema);
export default interviewModel;