const router = require('express').Router();
const { catchErrors } = require('../../handlers/errorHandler');
const controller  = require('../../controllers/gazar/property');
const auth = require('../../middlewares/gazar/auth');

// route
router.post("/get-settings", catchErrors(controller.getSettings));
router.post("/get-city", catchErrors(controller.getCity));
router.post("/upload-images", auth, catchErrors(controller.uploadPropertyImages));
router.post("/last-properties", catchErrors(controller.lastProperties));
router.post("/single-property", catchErrors(controller.singleProperty));
router.post("/similar-property", catchErrors(controller.getSimilarProperty));
router.post("/recommended-property", catchErrors(controller.getRecommended));
router.post("/get-properties", catchErrors(controller.getProperties));
router.post("/add-fav-props", auth, catchErrors(controller.addFavPrpos));

module.exports = router;