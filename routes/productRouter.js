import express from 'express';
import { createProduct, getProduct, deleteProduct, getProductById, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/", createProduct); // Create new product
productRouter.get("/", getProduct); // Get all products
productRouter.get("/:productId", getProductById); // Get product by ID
productRouter.put("/:productId", updateProduct); // Update product by ID
productRouter.delete("/:productId", deleteProduct); // Delete product by ID

export default productRouter;