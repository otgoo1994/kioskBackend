const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const controller  = require('../controllers/kiosk');
const auth = require('../middlewares/authall');
// const payment = require('../middlewares/auth');

// route
router.post("/login",catchErrors(controller.login));
router.post("/get-photo", catchErrors(controller.getPhotos));
router.post("/get-content", catchErrors(controller.getContentForKiosk));

module.exports = router;