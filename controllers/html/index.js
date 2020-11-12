const router = require('express').Router();
const home = require('./homepage');
const login = require('./login');

router.use('/',home);
router.use('/',login);

module.exports = router;