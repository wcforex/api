const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://wcforex:wcforex@cluster0.ixkcyle.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('Database connected🟢')).catch((err) => console.log(err))