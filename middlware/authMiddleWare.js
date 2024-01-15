const jwt = require('jsonwebtoken');
const User = require('../models/User')

const requireAuth = (req, res, next) => {
  const token = req?.cookies?.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'the secret', (err, decodedToken) => {
      if (err) {
        res.redirect('/login');
      } else {
        console.log(decodedToken, 'decodedToken')
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const checkUser = (req, res, next) => {
  const token = req?.cookies?.jwt;
  if(token) {
    jwt.verify(token, 'the secret', async (err, decodedToken) => {
      if(err) {
        res.locals.user = null;
        next();
      } else {
        console.log(res.locals, 'locals');
        let user = await User.findById(decodedToken.id)
        res.locals.user = user;
        next()
      }
    })
  } else {
    res.locals.user = null
    next();
  }
}

module.exports = { requireAuth, checkUser };