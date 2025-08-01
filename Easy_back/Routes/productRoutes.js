const router = require("express").Router();
const { createProduct, listProduct, searchProducts, getProductById, deleteProduct, getsellerProducts } = require("../Controller/productController");
const authMiddleware = require("../Middleware/Auth");
const AuthorizedRoles = require("../Middleware/AuthorizedRoles");
const fileUpload = require("../Middleware/Mutler");


router.post("/create", authMiddleware, fileUpload('image'), createProduct);
// Allow all authenticated users to list products
router.get("/list", authMiddleware, listProduct);
router.get("/search", authMiddleware, searchProducts);
router.get('/:id', authMiddleware, getProductById);
router.delete('/delete/:id', authMiddleware, AuthorizedRoles("admin"), deleteProduct);


module.exports = router;