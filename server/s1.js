const express=require('express')
const app=express()
const cors=require('cors')
const path = require("path");
require('dotenv').config()
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);
// console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
// console.log(process.env.EMAIL_USER);
const db=require('./config/db')
db()
app.use(
  "/media",
  express.static(path.join(__dirname, "media"))
);
app.use(express.urlencoded({
    extended:true
}))
const user=require('./router/user')
const enquiry=require('./router/enquiry')
const review=require('./router/review')
const settingsRoutes = require("./router/settings")
const policyRoutes = require("./router/policyRoutes");
const project = require('./router/project');
const service = require('./router/service');
app.use(cors());
app.use(express.json())
app.use('/user',user)
app.use('/enquiry',enquiry)
app.use('/rev',review)
app.use("/settings", settingsRoutes)
app.use('/policies', policyRoutes)
app.use('/project', project);
app.use('/service', service);
const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    
})