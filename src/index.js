const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const noteRoute = require('./routes/noteRoutes');

const mongoose = require('mongoose');

app.use(express.json());

app.use ((req,res,next)=>{
    console.log("Http Method - " + req.method + " URL - "+ req.url);
    next();
});

app.use("/users",userRouter);
app.use("/note",noteRoute);


app.get("/",(req,res)=>{
    res.send('hello');
});

mongoose.connect("mongodb+srv://admin:admin@cluster0.97gtqkr.mongodb.net/")
.then(()=>{
    app.listen(3000,()=>{
        console.log('the port is running on 3000')
    });
})
.catch((error)=>{
    console.log(error)
});

