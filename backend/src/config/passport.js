import passport from "passport";
import EmployeeModel from "../models/employee.js";
import { Strategy } from "passport-local";

passport.use(
    new Strategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const employee = await EmployeeModel.findOne({ email: email });
                if (!employee) {
                    console.log("Invalid Email or Password");
                    return done(null, false);
                }

                const isValidPassword = await employee.isValidatePassword(password);
                if (!isValidPassword) {
                    console.log("Invalid Email or Password");
                    return done(null, false);
                }

                return done(null, employee);
            } catch (error) {
                console.log("error in finding the employee", error);
                return done(error);
            }
        }
    )
);

// serializing the employee to choose which key should be kept in cookies
passport.serializeUser((employee, done) => {
    return done(null, employee.id);
});

// deserializing the employee form the key in the cookies
passport.deserializeUser(async (id, done) => {
    try {
        const employee = await EmployeeModel.findById(id);
        if(!employee) {
            console.log("Employee not found");
            return done(null, false);
        }
        return done(null, employee);
    } catch (err) {
        console.log("Error in finding employee");
        return done(err);
    }
});

// check if employee authenticated
passport.checkAuthentication = (req, res, next) => {
    // if the employee is signed in, then pass on the request to the next function
    if (req.isAuthenticated()) {
      return next();
    }
  
    // redirecting the employee
    return res.redirect("/");
};

passport.setAuthenticatedEmployee = (req, res, next) => {
    // if employee is authenticated that store the employee in req
    if (req.isAuthenticated()) {
      res.locals.user = req.employee;
    }
    next();
};

export default passport;