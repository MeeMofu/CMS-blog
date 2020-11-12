const router = require('express').Router();

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        // Redeirect to home if the user is logged in
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

router.get('/signup', (req,res) => {
    if (req.session.loggedIn) {
        // Redeirect to home if the user is logged in
      res.redirect('/');
      return;
    }
  
    res.render('signup');
})

module.exports = router;