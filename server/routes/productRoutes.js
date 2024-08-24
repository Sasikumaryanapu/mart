import { Router } from "express";
import Product from "../models/products.model.js";

const router = Router();

// Create a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Get product by filter
router.get("/get", async (req, res) => {
  try {
    const { productName } = req.body;
    const product = await Product.findOne({
      name: { $regex: productName, $options: "i" },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product by ID
router.put("/:id", async (req, res) => {
console.log(req.body,'das')
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {count:req.body.count},
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/getByQuery", async (req, res) => {
  try {
    const { search } = req.body;
    
    console.log("Received query parameter:", search); 
    
    if (!search) {
      return res.status(400).json({ message: "Product name query parameter is required" });
    }

    const products = await Product.find({
      name: { $regex: new RegExp(search, 'i') }
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error("Error:", err); 
    res.status(500).json({ error: err.message });
  }
});




// Delete product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
