// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// Requiring our models
var db = require("../models");
var multer  = require('multer');
// Routes
// =============================================================
module.exports = function(app) {

  //File upload
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/uploads/')

    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })

  var upload = multer({ storage: storage });

  // DEFAULT GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({ }).then(function(data) {
      res.json(data);
    });
  });


  // DEFAULT GET route for getting all of the posts
  app.get("/api/userposts", function(req, res) {
    db.Post.findAll({ include: [db.User] }).then(function(data) {
      res.json(data);
    });
  });

  //OPTIONAL ROUTES FOR HOMEPAGE DISPLAY
  //GET route for ALL TIME posts
  app.get("/api/alltime-posts", function(req, res){

    db.Post.findAll({
      //***SORT BY LIKES - ALL
      order: '"likes" DESC'
    }).then(function(dbPost){
      res.json(dbPost);
    });
  });

  //GET route for NEW posts
  app.get("/api/new-posts", function(req, res){

    db.Post.findAll({
      //***sort by
      order: '"updatedAt" DESC'
    }).then(function(dbPost){
      res.json(dbPost);
    });
  });


  // Get route for retrieving a single post
  //redirect to post view
  app.get("/postview/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User, db.Comment]
    }).then(function(data) {
      //res.json(data);
      var postInfo = {
        post: data
      };
      res.render('postviewer', postInfo);
    });
  });


  // POST route for saving a new post to the database
  app.post("/api/posts", upload.single('picture'), function(req, res, next) {
    var imgSrc = (req.file.path).slice(7);
    db.Post.create({
      image: imgSrc,
      caption: req.body.caption,
      tags: req.body.tags,
      UserId: req.user.id
    }).then(function(dbPost) {
      res.redirect("/dashboard");

    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
        res.json(dbPost);
      });
  });
};
