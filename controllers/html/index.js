const router = require('express').Router();
const home = require('./homepage-routes');

router.use('/',home);

module.exports = router;