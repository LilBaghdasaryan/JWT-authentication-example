const express = require('express');
const authRoutes = require('./routes/authRoutes');
require('./helpers/init_mongodb')

const app = express();

//middleware

app.use(express.static('public'));
app.use(express.json());

//view engine
app.set('view engine', 'ejs');


//routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)
app.listen(3000, () => {
    console.log('Connected to port 3000')
})

//cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

    res.send('you got the cookies')
});

app.get('/read-cookie', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies, 'cookies');
    res.json(cookies);
})