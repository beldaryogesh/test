const express = require('express');
const mongoose = require('mongoose');
const adminRoute = require('./route/adminRoute');
const categoryRoute = require('./route/categoryRoute');
const serviceRoute = require('./route/serviceRoute');
const multer = require('multer');
const data = multer()
const app = express();


app.use(data.any())




const URL = "mongodb+srv://yogesh_beldar:Oh9CU4nZCayFGTeC@cluster0.zveoo.mongodb.net/practiceTest"

const connectDb = async () => {
    try {
       await mongoose.connect(URL);
        console.log('mongoDb Is Connected')
    } catch (error) {
        console.log(error);
    }
};


app.use('/', adminRoute);
app.use('/', categoryRoute)
app.use('/', serviceRoute)

const PORT = 4200;
const start = async () => {
    try {
        await connectDb();
        app.listen(PORT, ()=>{
            console.log(`express app is running on port ${PORT}`)
        }) 
    } catch (error) {
        
    }
};


start();