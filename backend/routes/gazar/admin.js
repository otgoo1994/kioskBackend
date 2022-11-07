const router = require('express').Router();
const { catchErrors } = require('../../handlers/errorHandler');
const controller  = require('../../controllers/gazar/admin');
const auth = require('../../middlewares/gazar/admin');

router.post("/login", catchErrors(controller.login));
router.post("/last-properties", auth, catchErrors(controller.lastProperties));
router.post("/approve-property", auth, catchErrors(controller.approveProperty));
router.post('/forgot-password', catchErrors(controller.forgotPassword));
router.get('/get-employee', auth, catchErrors(controller.getEmployee));
router.post('/add-employee', auth, catchErrors(controller.addEmployee));
router.delete('/remove-employee', auth, catchErrors(controller.removeEmployee));
router.put('/remove-property', auth, catchErrors(controller.removeProperty));
router.put('/update-report', auth, catchErrors(controller.updateReport));

module.exports = router;