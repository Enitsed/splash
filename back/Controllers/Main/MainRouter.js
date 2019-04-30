let router = require('express').Router();

/*
 * Main Router ('/main')
 * writer : enitsed
 */


// test ('/main/test')
router.get('/test', function(req, res, next) {
    res.send('Test TEST SETS');
});


module.exports = router;