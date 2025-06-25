-- ============================================
-- Database: Simple Store Management System
-- ============================================




-- ========== TABLE CREATION ==========



-- 1. Products Table
CREATE TABLE IF NOT EXISTS Products (
        product_id SERIAL PRIMARY KEY,
        product_name TEXT NOT NULL,
        price  NUMERIC(10,2) NOT NULL DEFAULT 0.00,
        stock_quantity INTEGER NOT NULL);        

-- 2. Customers Table
CREATE TABLE IF NOT EXISTS Customers (
        customer_id SERIAL PRIMARY KEY,
        first_name  TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE );   


-- 3. Orders Table
CREATE TABLE IF NOT EXISTS   Orders (
        order_id SERIAL PRIMARY KEY,
        order_date TIMESTAMP NOT NULL,
        customer_id INTEGER NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
        product_id INTEGER NOT NULL,
        FOREIGN KEY (product_id) REFERENCES Products (product_id),
        quantity INTEGER NOT NULL,
        total_price NUMERIC(10,2) NOT NULL);   --Will calculate manually (INSERT)       




-- ========== SAMPLE DATA INSERTION ==========

-- Products
INSERT INTO Products (product_name, price, stock_quantity) VALUES
('Laptop Pro X', 1200.00, 50),
('Wireless Mouse A', 25.50, 200),
('Mechanical Keyboard R', 89.99, 100),
('External SSD 1TB', 99.99, 75),
('Monitor 27-inch', 300.00, 30),
('Webcam HD', 45.00, 150),
('USB-C Hub', 35.00, 120);



-- Customers
INSERT INTO Customers (first_name, last_name, email) VALUES
('Alice', 'Smith', 'alice.smith@example.com'),
('Bob', 'Johnson', 'bob.j@example.com'),
('Charlie', 'Brown', 'charlie.b@example.com'),
('Diana', 'Prince', 'diana.p@example.com'),
('Eve', 'Adams', 'eve.a@example.com'),
('Frank', 'White', 'frank.w@example.com');


-- Orders (with total_price calculated as price * quantity)
INSERT INTO Orders (order_date, customer_id, product_id, quantity, total_price) VALUES
('2024-01-10 10:00:00', 1, 1, 1, 1200.00 * 1), -- Alice bought Laptop
('2024-01-11 11:30:00', 2, 2, 2, 25.50 * 2),   -- Bob bought 2 Mice
('2024-01-12 14:00:00', 3, 3, 1, 89.99 * 1),   -- Charlie bought Keyboard
('2024-01-13 09:15:00', 1, 4, 1, 99.99 * 1),   -- Alice bought SSD
('2024-01-14 16:45:00', 4, 5, 1, 300.00 * 1),  -- Diana bought Monitor
('2024-01-15 10:00:00', 2, 1, 1, 1200.00 * 1), -- Bob bought Laptop
('2024-01-16 11:00:00', 5, 2, 3, 25.50 * 3);   -- Eve bought 3 Mice


 
-- ========== JOIN QUERIES ==========

 
SELECT
  o.order_id,                                        -- Showing all orders in sequence (ascending) with their total price
  o.quantity,
  p.price,
  p.product_name,
  (o.quantity * p.price) AS total_price
FROM Orders o
JOIN Products p ON o.product_id = p.product_id
GROUP BY o.order_id,p.product_name,o.quantity,p.price
ORDER BY o.order_id;


 
SELECT  
o.order_id,                                            -- Shows all orders  with customers for each order 
o.order_date,                                          -- Whole customer information with all details of order
o.customer_id,                                          
o.product_id,
o.quantity,
o.total_price,
c.first_name,
c.last_name,
c.email
FROM Orders o 
LEFT JOIN Customers c ON o.customer_id = c.customer_id;



 
SELECT 
p.product_id,                                           -- Shows summory of  all products with their sales (descending order) 
p.product_name,                                         -- and total price of each sold product
p.price,
p.stock_quantity,
COALESCE(SUM(o.quantity * p.price),0) AS total_price,
COALESCE(SUM(o.quantity),0) AS total_quantity_sold
FROM Products p 
LEFT JOIN Orders o ON p.product_id = o.product_id 
GROUP BY p.product_id, p.product_name, p.price, p.stock_quantity
ORDER BY total_quantity_sold DESC;

SELECT                                                                  
c.first_name,                                         -- Showing all customers and  how much amount each of them spent totally
c.last_name,                                          
SUM(o.quantity * p.price) AS total_spent
FROM Customers c 
JOIN Orders o ON c.customer_id = o.customer_id
JOIN Products p ON o.product_id = p.product_id
GROUP BY c.first_name,c.last_name
ORDER BY  total_spent DESC;
