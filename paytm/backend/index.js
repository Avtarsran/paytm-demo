const express = require("express");
const bodyParser = require('body-parser')
const app = express()
const mainRouter = require('./routes/index')
const cors = require("cors")

app.use(cors())
app.use(bodyParser.json())
app.use("/api/v1/",mainRouter)

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})