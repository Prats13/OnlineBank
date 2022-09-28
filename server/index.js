const express = require('express');
const connectDB = require('./config/db.js');
let cors = require('cors');

//routes
const login = require('./routes/api/login');
const account = require('./routes/api/acc');

const app = express();

//Connect DB
connectDB();

//cors
app.use(cors({origin:true,credentials:true}));

//Init Middleware
app.use(express.json({extended:false}));

app.get('/', (req, res) => res.send('Hello world!'));

//use Routes
app.use('/api/login',login);
app.use('/api/account',account);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));