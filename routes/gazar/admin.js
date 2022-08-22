const router = require('express').Router();
const { catchErrors } = require('../../handlers/errorHandler');
const controller  = require('../../controllers/gazar/admin');
const auth = require('../../middlewares/gazar/admin');

router.post("/login", catchErrors(controller.login));
router.post("/last-properties", auth, catchErrors(controller.lastProperties));
router.post("/approve-property", auth, catchErrors(controller.approveProperty));

module.exports = router;