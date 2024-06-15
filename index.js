import dotenv from "dotenv";
dotenv.config();
import server from "./app.js";
import { connectToDB } from "./backend/src/config/db.js";

const port = process.env.PORT || 3000;

try {
    server.listen(port, async () => {
        await connectToDB();
        console.log(`server is running at http://localhost:${port}`);
    })
} catch (err) {
    console.log(`server failed with error ${err}`);
}