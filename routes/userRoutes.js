const router = require('express').Router();
const { protect } = require('../middleware/auth');
const c = require('../controllers/userController');
router.use(protect);
router.get('/me', c.me);
router.patch('/me', c.updateMe);
module.exports = router;
