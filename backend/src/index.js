import app from "./app.js";
import connectDB from "./db/db.js";
import { environment } from "./utils/constenst.js";
import dotenv from "dotenv"

dotenv.config()

const PORT = environment.PORT || 4000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`)
    })
})