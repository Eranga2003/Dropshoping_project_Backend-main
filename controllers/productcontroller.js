import Product from "../models/product.js";
import { isAdmin } from "./usercontroller.js";
import mongoose from "mongoose";

// Create Product
export function createProduct(req, res) {
    const isAdminResult = isAdmin(req);

    if (!isAdminResult) {
        res.status(403).json({ message: "Please log in as an administrator to add a product." });
        return;
    }

    const newProductData = req.body;

    if (Object.keys(newProductData).length === 0) {
        res.status(400).json({ message: "No data received. Please provide product details." });
        return;
    }

    if (!newProductData.productType || !["women", "men", "baby"].includes(newProductData.productType)) {
        res.status(400).json({ message: "Invalid or missing productType. Allowed values are 'women', 'men', 'baby'." });
        return;
    }

    const product = new Product(newProductData);

    product.save()
        .then(() => {
            res.status(201).json({ message: "Product created successfully." });
        })
        .catch((error) => {
            console.error("Error saving product to database:", error);
            res.status(500).json({ message: "Product not created due to an error." });
        });
}

// Get All Products
export function getProduct(req, res) {
    Product.find({})
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((error) => {
            console.error("Error fetching products from database:", error);
            res.status(500).json({ message: "Failed to fetch products." });
        });
}

// Delete Product
export function deleteProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Please login as administrator to delete products",
        });
        return;
    }

    const productId = req.params.productId;

    Product.deleteOne({ productId: productId })
        .then(() => {
            res.json({
                message: "Product deleted",
            });
        })
        .catch((error) => {
            res.status(403).json({
                message: error,
            });
        });
}

// Get Product By ID
export function getProductById(req, res) {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({ message: "Invalid Product Id" });
    }

    Product.findById(productId)
        .then((product) => {
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        })
        .catch((error) => {
            console.error("Error fetching product from database:", error);
            res.status(500).json({ message: "Failed to fetch product" });
        });
}

// Update Product
export function updateProduct(req, res) {
    const isAdminResult = isAdmin(req);

    if (!isAdminResult) {
        return res
            .status(403)
            .json({ message: "Please log in as an administrator to update a product." });
    }

    const { productId } = req.params;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({ message: "Invalid Product Id" });
    }

    if (updatedData.productType && !["women", "men", "baby"].includes(updatedData.productType)) {
        return res.status(400).json({ message: "Invalid productType. Allowed values are 'women', 'men', 'baby'." });
    }

    Product.findByIdAndUpdate(productId, updatedData, { new: true, runValidators: true })
        .then((product) => {
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ message: "Product updated successfully.", product });
        })
        .catch((error) => {
            console.error("Error updating product in database:", error);
            res.status(500).json({ message: "Failed to update product." });
        });
}
 //l