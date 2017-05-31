var db = require("../models");

module.exports = function(app){

  app.get("/api/comments", function(req, res) {
    db.Comment.findAll({})
    .then(function(dbComment){
      res.json(dbComment);
    });
  });

  app.get("/api/comments/:id", function(req, res) {
    db.Comment.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  app.post("/api/comments", function(req, res) {
    db.Comment.create(req.body).then(function(dbPost) {
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