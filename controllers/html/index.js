const router = require('express').Router();
const home = require('./homepage');
const login = require('./login');
const dashboard = require('./dashboard');

router.use('/',home);
router.use('/',login);
router.use('/dashboard',dashboard);

module.exports = router;