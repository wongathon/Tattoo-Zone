 //load bcrypt
 var bCrypt = require('bcrypt-nodejs');
 var db = require("../models");
 module.exports = function(passport) {
   var user = db.User;
   var User = user;
   var LocalStrategy = require('passport-local').Strategy;

   passport.serializeUser(function(user, done) {
     done(null, user.id);
   });

   // used to deserialize the user
   passport.deserializeUser(function(id, done) {
     User.findById(id).then(function(user) {
       if (user) {
         done(null, user.get());
       } else {
         done(user.errors, null);
       }
     });
   });

   //local SIGN UP
   passport.use('local-signup', new LocalStrategy(
     {
       usernameField: 'email',
       passwordField: 'password',
       passReqToCallback: true // allows us to pass back the entire request to the callback
     },

     function(req, email, password, done) {

       var generateHash = function(password) {
         return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
       };

       User.findOne({
         where: {
           email: email
         }
       }).then(function(user) {

         if (user) {
           return done(null, false, req.flash('signupMessage', 'That email is already taken'));
         } else {
           var userPassword = generateHash(password);
           var data = {
             email: email,
             password: userPassword,
             username: req.body.username,
             firstname: req.body.firstname,
             lastname: req.body.lastname
           };

           User.create(data).then(function(newUser, created) {
             if (!newUser) {
               return done(null, false, req.flash('userExist', 'You are already registered. Please sign in!'));
             }
             if (newUser) {
               return done(null, newUser, req.flash('userCreated', 'You are now registered and logged in!'));
             }
           });
         }
       });

     } //function done. 

   ));

   //LOCAL SIGNIN
   passport.use('local-signin', new LocalStrategy({
       // by default, local strategy uses username and password, we will override with email
       usernameField: 'email',
       passwordField: 'password',
       passReqToCallback: true // allows us to pass back the entire request to the callback
     },

     function(req, email, password, done) {

       var User = user;

       var isValidPassword = function(userpass, password) {
         return bCrypt.compareSync(password, userpass);
       }

       User.findOne({
         where: {
           email: email
         }
       }).then(function(user) {

         if (!user) {
           return done(null, false, req.flash('signinError', 'Email does not exist'));
         }
         if (!isValidPassword(user.password, password)) {
           return done(null, false, req.flash('passwordError', 'Incorrect password.'));
         }

         var userinfo = user.get();
         return done(null, userinfo);

       }).catch(function(err) {

          console.log("Error:", err);
         return done(null, false, req.flash('genError', 'Something went wrong with your Signin'));

       });

     }
   ));
 }
