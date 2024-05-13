import express from "express";
import formidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

const router=express.Router()

//controllers
import { fetchProductById,addProduct,updateProductDetails,deleteProductDetails,fetchProducts,fetchAllProducts,addProductReview,fetchTopProducts,fetchNewProducts} from "../controllers/productController.js";


router.route('/').get(fetchProducts).post(authenticate,authorizeAdmin,formidable(),addProduct);
router.route("/allproducts").get(fetchAllProducts);
router.route('/:id/reviews').post(authenticate,checkId,addProductReview)
router.get('/top',fetchTopProducts)
router.get('/new',fetchNewProducts)
router.route("/:id").put(authenticate,authorizeAdmin,formidable(),updateProductDetails);
router.route("/:id").delete(authenticate,authorizeAdmin,deleteProductDetails);
router.route("/:id").get(fetchProductById);


export default router;