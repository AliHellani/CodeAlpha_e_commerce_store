const productRepository = require("../repository/product_repository");

//Create Products
async function createProduct(req, res) {
  try {
    const productData = req.body;
    const productImage = req.file;

    const result = await productRepository.saveProduct(
      productData,
      productImage
    );

    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(500).json({ error: result.message });
    }
  } catch {
    console.error("Error creating Product:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//Find All Products
async function getAllProducts(req, res) {
  try {
    const products = await productRepository.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//Find Product By ID
async function getProductById(req, res) {
  try {
    const productId = req.params.id;
    const product = await productRepository.findById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product Not Found" });
    }
  } catch (error) {
    console.error("Error retrieving Product:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//Delete Product
async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const result = await productRepository.deleteProduct(productId);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error Deleting Product:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
};
