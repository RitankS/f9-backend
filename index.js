import express from "express"
import cors from "cors"
import call from "./route.js"
const app = express()
app.use(express.json())
app.use(cors())



app.use("/f9" , call )



app.listen(5110 ,()=>{
    console.log("App is listening")
} )