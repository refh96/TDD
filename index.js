const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();



const serviciosRoute = require('./routes/serviciosRoute');
const categoriaRoutes = require('./routes/categoriaRoutes');


app.use(cors());
app.use(express.json());
app.options('*', cors());
app.use('/api', serviciosRoute);
app.use('/api', categoriaRoutes);


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DB, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to database");
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})
