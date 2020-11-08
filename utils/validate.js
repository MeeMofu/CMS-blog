const validateUser = (req,res,next) => {
    if (req.body.username && req.body.password) next();
    else res.status(400).json({message: 'Missing field'});
};
const validatePost = (req,res,next) => {
    if (req.body.tiltle && req.body.content) next();
    else res.status(400).json({message: 'Missing field'});
};
const validateAuth = (req,res,next) => {
    if (req.session.user_id) next();
    else res.redirect('/login');
}

module.exports = {validateUser, validatePost, validateAuth};