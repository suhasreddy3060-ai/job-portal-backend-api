const router = require('express').Router();
const { body } = require('express-validator');
const c = require('../controllers/authController');
const validate = require('../middleware/validate');

router.post('/register', [body('name').trim().isLength({ min: 2 }), body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 6 }), body('role').optional().isIn(['seeker','employer'])], validate, c.register);
router.post('/login', [body('email').isEmail().normalizeEmail(), body('password').notEmpty()], validate, c.login);
router.post('/logout', c.logout);
module.exports = router;
