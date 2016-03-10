// include and setup express
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

//  include api file
var api = require('./routes/api');

// connect to mongoose
mongoose.connect('mongodb://localhost/epam');
var user = require('./data/userDB.js');

// crethe the express app
var app = express();
// setup our public directory (which will serve any file stored in the 'public' directory)
app.use(express.static('public'));

// passport authentication for login
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');

// include express handlebars (templating engine)
var exphbs  = require('express-handlebars');
// specify the layout for our handlebars template
var hbs = exphbs.create({defaultLayout: 'main'});
// setup handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware that parser the key-value pairs sent in the request body in the format of our choosing (e.g. json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// for passport
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' , resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// create array scripts to store personal js files
app.use(function (req, res, next) {
  res.locals.scripts = [];
  next();
});

// create passport local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    user.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(user, done) {
   done(null, user);
});

// respond to the get request with the home page
app.get('/', function (req, res) {
  res.locals.scripts.push('/js/home.js');
  res.render('home');
});

// respond to the get request with the about page
app.get('/about', function(req, res) {
  res.render('about');
});

// respond to the get request with the register page
app.get('/register', function(req, res) {
  res.locals.scripts.push('/js/home.js');
  res.render('register');
});

// respond to the get request with the login page
app.get('/login', function(req, res) {
  res.render('login');
});

// handle the posted login data
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true })
);

// handle the posted registration data
app.post('/register', function(req, res) {
  // get the data out of the request (req) object
  // store the user in memory here
  user.create(req.body, function(err, user) {
    if(err){
      if(err.message.match('email')){
        res.render('register', {errorMail: "    Email already be registered!!"})
      }if(err.message.match('name')){
        res.render('register',{errorName: "    Name already be registered!!"});
      }
    }else{
      res.redirect('/login');
    }
  });
});

// respond to the get request with dashboard page (and pass in some data into the template / note this will be rendered server-side)
app.get('/dashboard', function (req, res) {
  res.locals.scripts.push('/js/dashboard.js');
  res.render('dashboard',{
  	stuff: [{
	    greeting: "Hello",
	    subject: "World!"
	}],
  user: req.user
  });
});

// the api (note that typically you would likely organize things a little differently to this)
app.use('/api', api);

// create the server based on express
var server = require('http').createServer(app);

// start the server
server.listen(1337, '127.0.0.1', function () {
  console.log('The Next XYZ is looking good! Open http://localhost:%d to begin.', 1337);
});