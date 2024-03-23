const { getToken } = require("../services/authStorage");

// const isAuthenticated = (req, res, next) => {
//   console.log('Is authenticated??');
//   if (!hasToken()) {
//     return res.redirect('/login');
//   }
//     next();
// }

const isloggedInAlready = (req, res, next) => {

    console.log('Is logged in already??');

    if(req.cookies['AUTH']){
        console.log('Cookie exist:', req.cookies['AUTH'])
        // Validate cookie

        

        // Cookie is valid
        return res.redirect('/home');
      }


    next();

}

module.exports = isloggedInAlready;