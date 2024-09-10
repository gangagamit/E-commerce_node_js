require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
// const multer = require('multer');
const port = process.env.port || 4000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use('/public/images',express.static(path.join(__dirname,'public/images')));

app.get('/',(req,res)=>{
    res.send('welcome to express js');
    res.end();
});

const userRoutes = require('./routes/user.routes');
app.use("/api/user",userRoutes);

//otp
const otpRoutes = require('./routes/otp.routes');
app.use("/api/otp",otpRoutes);

//product
const productRoutes = require('./routes/product.routes');
app.use('/api/product',productRoutes);
app.listen(port,()=>{
    mongoose.connect(process.env.Mongo_URI)
    .then(()=>console.log('database connect successfully'))
    .catch(error=>console.log(error));
    console.log(`server start at http://localhost:${port}`);
})
