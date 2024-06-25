// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'hostel_db'
});

passport.use(new LocalStrategy((username, password, done) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) { return done(err); }
    if (!results.length) {
      return done(null, false, { message: 'Username not found' });
    }
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});


passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE user_id = ?', [id], (err, results) => {
    if (err) { return done(err); }
    done(null, results[0]);
  });
});

