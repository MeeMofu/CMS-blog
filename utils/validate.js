const { Post, User, Comment } = require('../models');

const validateUser = (req,res,next) => {
    if (req.body.username && req.body.password) next();
    else res.status(400).json({message: 'Missing field'});
};
const validatePost = (req,res,next) => {
    if (req.body.title && req.body.content) next();
    else res.status(400).json({message: 'Missing field'});
};
const validateAuth = (req,res,next) => {
    if (req.session.user_id) next();
    else res.redirect('/login');
}
const validatePostAction = (req,res,next) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes:['user_id']
    })
    .then(data=>{
        const info = data.get({ plain: true });
        if (req.session.user_id === info.user_id) next();
        else res.status(401).json({message: "You aren't supposed to do that"});
    })
    
}
const validateCommentAction = (req,res,next) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes:['user_id']
    })
    .then(data=>{
        const info = data.get({ plain: true });
        if (req.session.user_id === info.user_id) next();
        else res.status(401).json({message: "You aren't supposed to do that"});
    })
    
}

module.exports = {validateUser, validatePost, validateAuth, validatePostAction,validateCommentAction};