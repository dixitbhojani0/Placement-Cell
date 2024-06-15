import EmployeeModel from "../models/employee.js";

export const signUp = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/profile");
    }
    return res.render("signup", { 
        title: "SIGNUP"
    });
}

export const signIn = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    return res.render("signin", { 
        title: "SIGNIN"
    });
}

export const createEmployee = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // if password doesn't match
        if (password != confirmPassword) {
            return res.redirect("/");
        }

        // check if user already exist
        const employee = await EmployeeModel.findOne({ email });
        if (employee) {
            console.log("error", "Email already registed!");
            return res.redirect("/");
        }

        const newUser = new EmployeeModel({ name: name, email: email, password: password });
        await newUser.save();

        return res.redirect("/");

    } catch (err) {
        console.log("error", err);
    }
}

export const createSession = (req, res) => {
    return res.redirect("/dashboard");
}

export const destroySession = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        return res.redirect("/");
    })
}

export const updateEmployee = async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.user.id);
        if (!employee) {
            return res.redirect("/");
        }

        const { name, password, confirmPassword } = req.body;
        if (password != confirmPassword) {
            return res.redirect("/");
        }

        employee.name = name;
        employee.password = password;
        await employee.save();
        return res.redirect("/");

    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}

export const profile = (req, res) => {
    return res.render("employeeProfile", {
        title: "Employee Profile",
        profileUser: req.user,
    })
}