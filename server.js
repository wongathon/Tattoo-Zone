// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport   = require('passport');
var exphbs     = require('express-handlebars');
var session    = require('express-session');
var flash = require('connect-flash');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8082;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(flash());

     // For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


     //For Handlebars
// app.set('views', './public/views')
// app.engine('hbs', exphbs({extname: '.hbs'}));
// app.set('view engine', '.hbs');

app.set('views', './public/views');

app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        extname: '.hbs',
        layoutsDir:'./public/views/layouts',
        partialsDir:'./public/views/partials'
}));
app.set('view engine', '.hbs');

// Static directory
app.use(express.static("./public"));

//load passport strategies


// Routes =============================================================

require('./config/passport.js')(passport, db.user);
require("./routes/html-routes.js")(app);
require("./routes/post-api-routes.js")(app);
require("./routes/user-api-routes.js")(app, passport);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
