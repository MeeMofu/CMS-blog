const router = require('express').Router();
const validate = require('../../utils/validate');
const { Post} = require('../../models');


router.get('/', validate.validateAuth, (req, res) => {
    Post.findAll({
        where:{
            user_id: req.session.user_id
        },
        order: [['updated_at','DESC']]
    }).then( data =>{
        const posts = data.map(post => post.get({ plain: true }));
        res.render('dashboard-home',{
            posts,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


module.exports = router;