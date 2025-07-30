const router = require("express").Router();
const { createProduct, listProduct, searchProducts, getProductById, deleteProduct, getsellerProducts } = require("../Controller/productController");
const authMiddleware = require("../Middleware/Auth");
const AuthorizedRoles = require("../Middleware/AuthorizedRoles");
const fileUpload = require("../Middleware/Mutler");


router.post("/create", authMiddleware, fileUpload('image'), createProduct);
router.get("/list", authMiddleware, AuthorizedRoles("admin"), listProduct);
router.get("/search", authMiddleware, searchProducts);
router.get('/:id', authMiddleware, getProductById);
router.delete('/delete/:id', authMiddleware, AuthorizedRoles("admin"), deleteProduct);
router.get('/sellerProd', authMiddleware, AuthorizedRoles("seller","admin"), getsellerProducts);

module.exports = router;