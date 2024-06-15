import cookieParser from "cookie-parser";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import { errorHandlerMiddleware } from "./backend/src/middleware/errorHandlerMiddleware.js";
import employeeRouter from "./backend/src/routes/employee.js";
import studentRouter from "./backend/src/routes/student.js";
import interviewRouter from "./backend/src/routes/interview.js";
import path from "path";
import session from "express-session";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import passport from './backend/src/config/passport.js';
import flash from "connect-flash";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("public")));

// set up view engine
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve("backend", "src", "views"));

app.use(
    session({
        name: "placement-cell",
        secret: "asewe",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
        store: MongoStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017/PlacementCell",
            autoRemove: "disabled",
        }),
        function(err) {
            console.log(err || "connect-mongodb setup ok");
        }
    })
);

// Initialize flash
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedEmployee);

// configure routes
app.use("/", employeeRouter);
app.use("/student", studentRouter);
app.use("/interview", interviewRouter);

// errorHandlerMiddleware
app.use(errorHandlerMiddleware);

export default app;