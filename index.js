require("dotenv").config()
require("./config/dbConnect")
const express = require("express")
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const packageRoutes = require('./routes/packageRoutes')
const orderRoutes = require('./routes/orderRoutes')

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/package', packageRoutes);
app.use('/api/v1/order', orderRoutes);

app.listen(8200, () => console.log("Server running..."));