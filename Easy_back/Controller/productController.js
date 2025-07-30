const router = require('express').Router();
const authMiddleware = require("../Middleware/Auth");
const fileUpload = require("../Middleware/Mutler");
const { Product, User } = require("../Model/index");
const { Op } = require("sequelize");

const createProduct = async (req, res) => {
  const { name, price, description, category, stock } = req.body;
  const image = req.file ? req.file.filename : null;  // Instead of req.file.path

    if(!name || !price || !description || !category || !stock) {
        return res.status(400).json({ error: "Name, price, description, category, and stock are required" });
    }

    if(price <= 0) {
        return res.status(400).json({ error: "Invalid price" });
    }
    if(!image) {
        return res.status(400).json({ error: "Image is required" });
    }
  try {
    console.log(req.body)
    const product = await Product.create({ sellerid: req.user.id ,
         name,
          price,
          description,
          image,
          category,
          stock
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const listProduct = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'description', 'image', 'category'],
      where: { sellerid: req.user.id }
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const searchProducts = async (req, res) => {
  const q = req.query.q || "";
  const category = req.query.category || "";

  try {
    const where = {};

    if (q) {
      where.name = { [Op.like]: `%${q}%` };
    }

    if (category) {
      where.category = category;
    }

    const products = await Product.findAll({
      where,
      include: {
        model: User,
        as: "seller",
        attributes: ["id", "username", "email"],
      },
    });

    res.json(products);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Error searching products", error: error.message });
  }
};


const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: {
        model: User,
        as: "seller",
        attributes: ["id", "username", "email"],
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params; 

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getsellerProducts = async (req, res) => {
  try {
    const sellerId = req.user.id;  // logged-in user id from token

    const products = await Product.findAll({
      where: { sellerid: sellerId },  // make sure this field matches your DB column
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(products);

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};





module.exports = {
    createProduct,
    listProduct,
    searchProducts,
    getProductById,
    deleteProduct,
    getsellerProducts,
}