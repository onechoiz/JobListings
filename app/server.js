const express = require("express")
const PORT = process.env.MY_PORT || 4000
const router = new express.Router()
const mongooose = require("mongoose")

const jobRouter  = require("./routers/jobRouter")

const app = express()

app.use(express.json())

app.use(jobRouter)


mongooose.connect("mongodb://localhost:27017/jobs-projects")

app.listen(PORT, ()=>{
    console.log(`app running on ${PORT}`);
})