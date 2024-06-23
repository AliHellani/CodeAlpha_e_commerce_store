const sql = require("mssql");
const pool = require("../models/db");

//Create new Products:
async function saveProduct(productData, productImage) {
  try {
    await pool.connect();
    const imagePath = `/images/product-image/${productImage.originalname}`;

    const query = `
        INSERT INTO  product (p_name,p_image, p_price, p_quantity, p_description)
        VALUES (@p_name, @p_image, @p_price, @p_quantity, @p_description)
        `;
    const result = await pool
      .request()
      .input("p_name", sql.VarChar, productData.p_name)
      .input("p_image", sql.VarChar, imagePath)
      .input("p_price", sql.Decimal, productData.p_price)
      .input("p_quantity", sql.Int, productData.p_quantity)
      .input("p_description", sql.NVarChar, productData.p_description)
      .query(query);

    if (result.rowsAffected[0] > 0) {
      return { success: true, message: "Product created successfully" };
    } else {
      return { success: false, message: "Failed to create product" };
    }
  } catch (error) {
    console.error("Error creating Product:", error.message);
    return { success: false, message: "Internal Server Error" };
  } finally {
    pool.close();
  }
}

//FindAll Products
async function findAll() {
  try {
    await pool.connect();
    const query = "SELECT * FROM product";
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    console.error("Error retrieving products:", error.message);
    return { success: false, message: "Internal Server Error" };
  } finally {
    pool.close();
  }
}

//Find Products By ID
async function findById(id) {
  try {
    await pool.connect();
    const query = "SELECT * FROM product WHERE p_id = @id";
    const result = await pool.request().input("id", sql.Int, id).query(query);

    if (result.recordset.length > 0) {
      return result.recordset[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving product By ID:", error.message);
    return { success: false, message: "Internal Server Error" };
  } finally {
    pool.close();
  }
}

//Delete Product
async function deleteProduct(id) {
  try {
    await pool.connect();
    const query = "DELETE FROM product WHERE p_id=@id";
    const result = await pool.request().input("id", sql.Int, id).query(query);

    if (result.rowsAffected[0] > 0) {
      return { success: true, message: "Product Deleted Successfully" };
    } else {
      return { success: false, message: "Product Not Found" };
    }
  } catch (error) {
    console.error("Error Deleting Product:", error.message);
    return { success: false, message: "Internal Server Error" };
  } finally {
    pool.close();
  }
}

module.exports = {
  saveProduct,
  findAll,
  findById,
  deleteProduct,
};
