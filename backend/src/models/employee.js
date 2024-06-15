import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
    },
    { 
        timestamps: true
    }
);

employeeSchema.methods.isValidatePassword = async function (userSentPassword) {
    return this.password === userSentPassword;
}

const EmployeeModel = mongoose.model("Employee", employeeSchema);
export default EmployeeModel;
