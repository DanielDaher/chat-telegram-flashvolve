const router = require("express").Router();
const validateJWT = require("../auth/validateJWT");
const messagesController = require('../controllers/messagesController');

router.post('/', validateJWT, messagesController.create);
router.get('/', validateJWT, messagesController.getLastThirtyMessages);
router.get('/telegramContacts', validateJWT, messagesController.getContacts);

module.exports = router;