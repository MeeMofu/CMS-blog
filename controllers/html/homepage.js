const router = require('express').Router();
const { Post,User,Comment} = require('../../models');

router.get('/', (req,res)=>{
    Post.findAll(
        {include:[{
            model:User,
            attributes:['username']
        }],
        order: [['updated_at','DESC']]
      }
    ).then( data =>{
        const posts = data.map(post => post.get({ plain: true }));
        res.render('homepage',{
            posts,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Get single post
router.get('/post/:id',(req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
          },
        include:[{
            model:User,
            attributes:['username']
        },{
          model:Comment,
          // order: [ [ 'createdAt', 'DESC' ]],
          include:[{
            model:User,
            attributes:['username']
          }]
        }],
        order:[ [Comment,'createdAt','desc']]
      }
    ).then(data => {
        if (!data) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        const post = data.get({ plain: true });
        res.render('single-post', {
          post: post,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;