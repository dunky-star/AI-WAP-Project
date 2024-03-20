const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');

exports.signup = (req, res) => {
  const user = new User({
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
  
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate()
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];


      req.session.token = token;

      res.status(200).send({
        id: user._id,
        firstname : user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};


exports.forgotPassword = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate().exec((err, user) => {
      console.log(user);
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpier = new Date();
        otpExpier.setMinutes(otpExpier.getMinutes() + 10);
        //Query parameter is used to search the collection.
        var query = { email: req.body.email};
        //And When the query matches the data in the DB , "data" parameter is used to update the value.
        var data = { resettoken: otp.toString() }
        //Accessing the collection using nodejs
        User.updateOne(query, data, (err, collection) => {
          if (err) throw err;
          console.log("Record updated successfully");
          db.close();
        });
        try{
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
               user: 'youremail@gmail.com',
               pass: 'jbma wtsk deoz wtfk',
            },
          });

          const mailOptions = {
            from: 'youremail@gmail.com',
            to: req.body.email,
            subject: 'Password reset OTP',
            text: `Your OTP (It is expired after 10 min) : ${otp}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.status(500).send({ message: err });
            return;
          } else {
              res.json({
                  data: "Your OTP send to the email"
              })
          }
      });

        }catch (err) {
          res.status(500).send({ message: err });
          return;
        }
    });
};
