const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const productController = require("./controllers/product_controller");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../frontend")));

app.use(
  "/images/product-image/",
  express.static(path.join(__dirname, "../frontend/images/product-image/"))
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/images/product-image/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
app.use(bodyParser.json());
app.use(express.json());

//Products
app.post(
  "/products",
  upload.single("p_image"),
  productController.createProduct
);
app.get("/findAll", productController.getAllProducts);
app.get("/findProduct/:id", productController.getProductById);
app.delete("/deleteProduct/:id", productController.deleteProduct);

app.get("/test", async (req, res) => {
  try {
    await db.connect();
    res.status(200).json({ message: "Database connection is Active" });
  } catch (error) {
    console.error("Error connection to the database:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    db.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
