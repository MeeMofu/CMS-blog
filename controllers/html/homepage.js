const router = require('express').Router();
const { Post,User} = require('../../models');

router.get('/', (req,res)=>{
    Post.findAll(
        {include:[{
            model:User,
            attributes:['username']
        }]}
    ).then( data =>{
        const posts = data.map(post => post.get({ plain: true }));
        res.render('homepage',{
            posts,
            loggedIn: req.session.loggedIn
        });
    }
        
    )
});

module.exports = router;