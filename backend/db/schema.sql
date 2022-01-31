DROP crypto
CREATE crypto

Use crypto

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (role_id)
);


CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE products(
id INT AUTO_INCREMENT NOT NULL,
name: VARCHAR(255),
type: VARCHAR(255),
image: VARCHAR(255),
brand: VARCHAR(255),
description: VARCHAR(255),
price: INT(7),
PRIMARY KEY (id)
);

CREATE TABLE carts(
id INT AUTO_INCREMENT NOT NULL,
user_id INT,
FOREIGN KEY (user_id) REFERENCES user (id),
product_id INT,
FOREIGN KEY (product_id) REFERENCES product(id),
quantity INT(4),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (id)
);


