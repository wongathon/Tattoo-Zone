var db = require("../models");
var pass = require('../config/passport.js');

module.exports = function(app, passport) {
  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin',
    failureFlash: true
  }));

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get("/api/users", function(req, res) {
    db.User.findAll({})
    .then(function(dbUser){
      res.json(dbUser);
    });
  });

  app.get("/api/user/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

    //optional use case for admins
    app.put("/api/users/:id", function(req, res){
      db.User.update(
        req.body,
        {
          where: {
            id: req.body.id
          }
        }).then(function(dbUser){
          res.json(dbUser);
        });
      });

  };
