import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        college: {
            type: String,
            required: true,
        },
        batch: {
            type: String,
            required: true,
        },
        dsaScore: {
            type: Number,
            required: true,
        },
        webdevScore: {
            type: Number,
            required: true,
        },
        reactScore: {
            type: Number,
            required: true,
        },
        placementStatus: {
            type: String,
            required: true,
            enum: ["Placed", "Not Placed"],
        },
        interviews: [
            {
                company: {
                    type: String,
                    required: true,
                },
                date: {
                    type: String,
                    required: true,
                },
                result: {
                    type: String,
                    enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"],
                },
            }
        ],
    },
    {
        timestamps: true,
    }
);

const studentModel = mongoose.model("Student", studentSchema);
export default studentModel;