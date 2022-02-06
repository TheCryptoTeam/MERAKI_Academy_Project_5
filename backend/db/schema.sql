
DROP DATABASE crypto;
CREATE DATABASE crypto;

USE crypto;

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (role_id)
);


CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE products(
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(255) NOT NULL,
type VARCHAR(255) DEFAULT 'other',
image VARCHAR(255) NOT NULL,
brand VARCHAR(255) DEFAULT 'other',
description VARCHAR(255) NOT NULL,
price INT(7) NOT NULL,
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (id)
);

CREATE TABLE carts(
id INT AUTO_INCREMENT NOT NULL,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(id),
product_id INT,
FOREIGN KEY (product_id) REFERENCES products(id),
quantity INT(4),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (id)
);

CREATE TABLE wishList(
id INT AUTO_INCREMENT NOT NULL,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(id),
product_id INT,
FOREIGN KEY (product_id) REFERENCES products(id),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (id)
);




CREATE TABLE comments(
    id INT AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255),
    commenter VARCHAR(255),
    product_id INT,
FOREIGN KEY (product_id) REFERENCES products(id),
    commenter_id INT,
    FOREIGN KEY (commenter_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);