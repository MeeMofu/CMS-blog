const router = require('express').Router();
const validate = require('../../utils/validate');
const { Post, User, Comment } = require('../../models');

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
        id: req.params.id
        },
        include: [User,Comment]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', validate.validatePost,(req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', validate.validatePostAction, (req, res) => {
    // Validate that it's the user
    Post.update({
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id',validate.validatePostAction, (req, res) => {
    Post.destroy({
        where: {
        id: req.params.id
        }
    })
        .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
