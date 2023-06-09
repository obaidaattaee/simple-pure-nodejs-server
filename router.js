const HomeController = require('./controllers/HomeController')
router = {
    '/ping' : HomeController.ping
};

module.exports = router;