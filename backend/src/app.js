import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"


const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


export default app