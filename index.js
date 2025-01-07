require('dotenv').config();
const CLIENT = process.env.CLIENT
const devEnviroment = process.env.Enviroment === "DEV" ? true : false
const cleanedDomain = CLIENT.replace(/^https?:\/\//, ''); // Removes http:// or https://

const express = require("express")
const app = express();
const port = 3001
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", (req, res, next) => {
    res.cookie("test", "Hello from node", {
        secure:true, 
        httpOnly:true,
        domain: devEnviroment ? undefined : cleanedDomain,
        
    })
    res.send("hello from node")
})



app.listen(port, ()=>{
    console.log(`server is listning to port ${port}`)
})