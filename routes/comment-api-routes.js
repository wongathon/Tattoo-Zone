var db = require("../models");

module.exports = function(app){

  app.get("/api/comments", function(req, res) {
    db.Comment.findAll({})
    .then(function(dbComment){
      res.json(dbComment);
    });
  });

  //find all comments associated with post
  app.get("/api/comments/:postid", function(req, res) {
    db.Comment.findAll({
      where: {
        PostId: req.params.postid
      },
      include: [db.User]
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  app.post("/api/comments", function(req, res) {
    db.Comment.create({
      text: req.body.text,
      PostId: req.body.PostId,
      UserId: req.user.id
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.delete("/api/comments/:id", function(req, res) {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  //optional use case
  app.put("/api/comments", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbComment) {
        res.json(dbComment);
      });
  });

};