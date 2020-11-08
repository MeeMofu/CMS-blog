const router = require('express').Router();
const validate = require('../../utils/validate');
const { User, Post, Comment} = require('../../models');

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {id: req.params.id},
        include: [Post,Comment]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', validate.validateUser,(req, res) => {
    // Has middleware to check input fields
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(res.json({ message: 'User created'}))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    // Find username in database
    User.findOne({
        where: {username: req.body.username}
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found'});
            return;
        }
        // Check password
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(401).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // Save session to database
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

        res.json({ message: 'You are now logged in!' });
        });
    });
});

module.exports = router;
