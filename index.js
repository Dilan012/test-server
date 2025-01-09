require('dotenv').config();
const CLIENT = process.env.CLIENT
const devEnviroment = process.env.Enviroment === "DEV" ? true : false
const cleanedDomain = CLIENT.replace(/^https?:\/\//, ''); // Removes http:// or https://
const cors = require('cors');

const express = require("express")
const app = express();
const port = 3001
const cookieParser = require("cookie-parser");

app.use(cors({
        origin: 'https://test.ganket.work.gd',
        credentials:true
    }));

app.use(cookieParser());

app.get("/", (req, res, next) => {

    console.log(req.cookies)
    
    res.cookie("test", "Hello from node", {
        secure:true, 
        httpOnly:true,
        domain: cleanedDomain,
        sameSite:"none",
        path:"/auth"
        
    })
    
    res.json({messge:"hello from node", cookies: req.cookies})
})



app.listen(port, ()=>{
    console.log(`server is listning to port ${port}`)
})