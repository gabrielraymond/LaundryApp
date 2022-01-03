require('dotenv').config();
const express = require("express");
const cors = require('cors');

const app = express();

//Routes
const authRoute = require('./routes/authRoute');
const laundryRoute = require('./routes/laundryRoute');
const paymentRoute = require('./routes/paymentRoute');
const packageRoute = require('./routes/packageRoute');
const customerRoute = require('./routes/customerRoute');
const transactionRoute = require('./routes/transactionRoute');


//Connect DB
const conncetDB = require("./config/db");
conncetDB();

//Middleware
app.use(express.json());
app.use(cors());

// Routes Middleware
app.use("/api/user", authRoute);
app.use("/api/laundry", laundryRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/package", packageRoute);
app.use("/api/customer", customerRoute);
app.use("/api/transaction", transactionRoute);




app.listen(process.env.PORT || 5000, () => console.log(`Server working on Port `));
