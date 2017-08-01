 
DROP DATABASE IF  EXISTS bamazon ;

CREATE DATABASE bamazon;
USE bamazon;


CREATE TABLE products (
	itemId INTEGER(11) AUTO_INCREMENT NOT NULL,
	productName VARCHAR(30) NOT NULL,
	departmentName VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stockQuantity INTEGER(11) NOT NULL,
	PRIMARY KEY (itemId)
);


INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES  ('Bonze Eyeliner', 'Cosmetics', 6, 450),
		('Mascara', 'Cosmetics', 7, 570),
		('Trash Bags', 'Grocery', 7.99, 300),
		('Paper Towels', 'Grocery', 4.25, 400),
		('Apples', 'Produce', 0.35, 800),
		('Banana', 'Produce', 0.20, 6900),
		('Strawberry Juice', 'Grocery', 4.45, 267),
		('Yogurt', 'Grocery', 4.50, 200),
		('Diapers', 'Children', 3, 476),
		('Toiler Paper', 'Grocery', 7, 600),
		('Baby Wipes', 'Children', 1.50, 423),
		('Exercise Mat', 'Sports', 20, 150),
		('Football', 'Sports', 15, 89),
		('Leather Jacket', 'Clothing', 150, 12),
		('Shorts', 'Clothing', 15, 150),
		('Cat food', 'Pet', 7.25, 157),
		('Dog Food', 'Pet', 7.25, 163),
		('Phenovarvatin', 'Pharmacy', 5.99, 389),
		('Band Aid', 'Pharmacy', 3.25, 550),
		('NRGhealth', 'Pharmacy', 4.50, 450);
		