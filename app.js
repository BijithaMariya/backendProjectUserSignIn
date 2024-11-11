/*const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();

app.get("/",(req,res)=>{
    res.send("Server is ready")
})
console.log(process.env.MONGO_URI)
app.listen(5001 , ()=>{
    connectDB();
    console.log("App is connected")
})*/

const express = require('express');
const connectDB = require('./config/db');
//const User = require('../models/user');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());


connectDB();

app.use('/api/auth', authRoutes);

module.exports = app;

//require('dotenv').config();
/*const express = require('express');
const mongoose = require('mongoose')
const dbConfig  = require('./config/db.config');

const auth = require('./middlewares/auth');
const errors = require('./middlewares/error')

//const unless = require('express-unless')
const { unless } = require("express-unless")

const app = express();

mongoose.Promise = global.Promise;
mongoose
.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    ()=> {
        console.log("Database Connected")
    },
    (errors)=>{
        console.log("Database can't be Connected")
    }
);
auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path:[
            {url: "/user/signin", method: ["POST"]},
            {url: "/user/signup", method: ["POST"]}
        ]
    })
)
app.use(express.json());
app.use("/user", require("./routes/user.routes"))
app.use(errors.errorHandler);
app.listen(process.env.port || 4000, function(){
    console.log("App is connected")
})
//connectDB();
//app.use(express.json());
//app.use('/api/auth', authRoutes);

//module.exports = app;
*/