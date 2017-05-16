function setupAuth(Account, Config, app) {
  var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;

  // High level serialize/de-serialize configuration for passport
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    Account.
      findOne({ _id : id }).
      exec(done);
  });

  // Facebook-specific
  passport.use(new FacebookStrategy(
    {
      clientID: Config.facebookClientId,
      clientSecret: Config.facebookClientSecret,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['emails', 'name']
    },
    function(accessToken, refreshToken, profile, done) {
      if (!profile.emails || !profile.emails.length) {
        return done('No emails associated with this account!');
      }

      Account.findOneAndUpdate(
        { 'account_social.token': profile.id },
        {
          $set: {
            'email': profile.emails[0].value,
            'name': profile.username,
            'password': undefined,
            'phone': undefined,
            'nationality': undefined,
            'language': undefined,
            'birthday': undefined,
            'gender': profile.gender,
            'avatar_url': 'http://graph.facebook.com/' +
              profile.id.toString() + '/picture?type=large',
            'account_setting': undefined,
            'account_social.social_type': 'facebook',
            'account_social.token': profile.id,
            'account_social.expire_time': undefined,
            'account_social.social_name': profile.displayName,
            'account_social.social_birthday': undefined,
            'account_social.social_email': profile.emails[0].value,
            'account_social.social_phone': undefined,
            'brands': undefined
          }
        },
        { 'new': true, upsert: true, runValidators: true },
        function(error, user) {
          if(error) console.log(error);
          done(error, user);
        });
    }));

  // Express middlewares
  app.use(require('express-session')({
    secret: 'this is a secret'
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Express routes for auth
  app.get('/auth/facebook',
    function(req, res, next) {
      var redirect = encodeURIComponent(req.query.redirect || '/');

      passport.authenticate('facebook',
        {
          scope: ['email'],
          callbackURL: 'http://localhost:3000/auth/facebook/callback?redirect=' + redirect
        })(req, res, next);
    });

  app.get('/auth/facebook/callback',
    function(req, res, next) {
      var url = 'http://localhost:3000/auth/facebook/callback?redirect=' +
        encodeURIComponent(req.query.redirect);
      passport.authenticate('facebook', { callbackURL: url })(req, res, next);
    },
    function(req, res) {
      res.redirect(req.query.redirect);
    });
}

module.exports = setupAuth;
