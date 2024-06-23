CREATE TABLE product (
    p_id INT PRIMARY KEY IDENTITY(1,1),
    p_name VARCHAR(255),
    p_image VARCHAR(255),
    p_description TEXT,
    p_price DECIMAL(10, 2),
    p_quantity INT
);