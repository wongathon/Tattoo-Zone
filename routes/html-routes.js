// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads view.html
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/blog.html"));
    });

    // cms route loads cms.html
    app.get("/cms", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/cms.html"));
    });

    // blog route loads blog.html
    app.get("/blog", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/blog.html"));
    });

    // authors route loads author-manager.html
    app.get("/authors", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/author-manager.html"));
    });


// Handle user registration
    app.get('/signup', function(req, res) {
        res.render('signup');
    });

    app.get('/signin', function(req, res) {
        res.render('signin');
    });

    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard');
    });

    app.get('/logout', function(req, res) {
       // req.session.destroy(function(err) {
        req.session.destroy(function() {
            res.redirect('/');
        });
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
};







 
 
 
