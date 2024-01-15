const express = require('express');
const authRoutes = require('./routes/authRoutes');
require('./helpers/init_mongodb');
const { requireAuth, checkUser } = require('./middlware/authMiddleWare');
const app = express();
const cookieParser = require('cookie-parser');


//middleware

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');


//routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes)
app.listen(3000, () => {
    console.log('Connected to port 3000');
})