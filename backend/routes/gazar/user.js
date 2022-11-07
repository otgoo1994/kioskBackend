const router = require('express').Router();
const { catchErrors } = require('../../handlers/errorHandler');
const controller  = require('../../controllers/gazar/user');
const auth = require('../../middlewares/gazar/auth');
// const payment = require('../middlewares/auth');

// route
router.post("/login", catchErrors(controller.login));
router.post("/agent-info", catchErrors(controller.getAgentInfo));
router.post('/register', catchErrors(controller.register));
router.post('/verify-number', catchErrors(controller.verifyCode));
router.post('/forgot-password', catchErrors(controller.forgotPassword));
router.post('/get-info', auth, catchErrors(controller.getInfo));

module.exports = router;