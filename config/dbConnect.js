const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://wfx123:wfx123@cluster0.ixkcyle.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('Database connected🟢')).catch((err) => console.log(err))