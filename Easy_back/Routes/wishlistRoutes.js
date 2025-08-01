const router = require("express").Router();
const authMiddleware = require("../Middleware/Auth");
const controller = require("../Controller/wishlistController");
const AuthorizedRoles = require("../Middleware/AuthorizedRoles");

router.post('/add', authMiddleware, controller.addToWishlist);
router.get('/userlist', authMiddleware, controller.getWishlist);
router.get('/all', authMiddleware, AuthorizedRoles('admin'), controller.getAllWishlists);
router.delete('/remove/:productId', authMiddleware, controller.removeFromWishlist);

module.exports = router;
