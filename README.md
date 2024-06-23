E-Commerce Store Application

This repository contains the full-stack code for an e-commerce store application,
encompassing both backend and frontend components. The backend is built with Node.js and Express.js, 
interfacing with a Microsoft SQL Server database, while the frontend uses HTML, CSS, and JavaScript to provide an interactive user interface.

- Features:

Product Management: Create, retrieve, update, and delete products in the store.

Image Upload: Handle product image uploads and store them on the server.

Database Integration: Efficient database operations using mssql to connect with Microsoft SQL Server.

RESTful APIs: Clean and well-structured API endpoints for seamless integration with frontend applications.

Cart Management: Add products to the cart, view cart contents, and remove products from the cart.

Responsive Design: Optimized for various devices with a responsive layout.

SweetAlert2 Integration: Enhanced user interaction with SweetAlert2 for alerts and confirmations.

Error Handling: Robust error handling and validation for stable and reliable performance.

- Technologies Used:

 1- Backend:

Node.js: Server-side JavaScript runtime.

Express.js: Web framework for Node.js to build APIs.

Microsoft SQL Server: Relational database management system.

Multer: Middleware for handling multipart/form-data for image uploads.

Body-Parser: Middleware for parsing incoming request bodies.

   2- Frontend:

HTML: Structure of the web pages.

CSS: Styling of the web pages.

JavaScript: Dynamic content and interactions.

SweetAlert2: For enhanced alert and confirmation dialogs.

- File Structure:

   1- Backend:

index.js: Main entry point for the backend server.

controllers/: Contains controllers for handling requests.

repository/: Contains repositories for database interactions.

models/: Contains database configuration.

   2- Frontend:

index.html: Main page displaying the product list and a navigation bar.

addProduct.html: Page for adding new products to the store.

style.css: Stylesheet for the frontend, defining the layout and design of the pages.

script.js: JavaScript file for handling dynamic content and interactions on the main page.

cart.js: JavaScript file for managing the shopping cart functionality.

- Usage:

    1- Home Page (index.html):

Displays a list of products with options to add to cart or remove products.

Navigation bar with links to the Home page and About Us section.

Cart icon to view and manage cart contents.

   2- Add Product Page (addProduct.html):

Form to add a new product with fields for name, image, description, price, and quantity.

Submitting the form sends a POST request to the backend to add the product to the database.

   3- API Endpoints:

POST /products: Create a new product.

GET /findAll: Retrieve all products.

GET /findProduct/:id: Retrieve a product by ID.

DELETE /deleteProduct/:id: Delete a product by ID.
