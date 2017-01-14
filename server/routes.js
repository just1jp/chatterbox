var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/classes/messages', controller.messages.get);

router.post('/classes/messages', controller.messages.post);

router.get('/classes/users', controller.users.get);

router.post('/classes/users', controller.users.post);

// router.get('/user/:username', controller.users.post);

module.exports = router;

