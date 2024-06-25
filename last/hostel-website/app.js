const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const app = express();

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hostel_db'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword, email };
  db.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

// Google OAuth Setup
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: 'your_google_client_id',
    clientSecret: 'your_google_client_secret',
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    const { id, displayName, emails } = profile;
    const email = emails[0].value;
    // Check if user already exists in database
    db.query('SELECT * FROM users WHERE google_id = ?', [id], (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        // If user doesn't exist, create new user
        const newUser = { google_id: id, username: displayName, email };
        db.query('INSERT INTO users SET ?', newUser, (err, result) => {
          if (err) throw err;
          return done(null, newUser);
        });
      } else {
        // If user exists, return user
        return done(null, results[0]);
      }
    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
port=3000   ;
// Start server
const PORT = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  
