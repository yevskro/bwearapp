"use strict"
module.exports = [
    `CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(200),
        email VARCHAR(100),
        phone_number VARCHAR(20),
        password TEXT,
        role SMALLINT,
        address_id INT,
        create_date TIMESTAMP,
        UNIQUE(email)
    );`,
    `CREATE TABLE user_addresses (
        address_id SERIAL PRIMARY KEY,
        street_address VARCHAR(200),
        city VARCHAR(100),
        state VARCHAR(100),
        zipcode VARCHAR(30),
        user_id INT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    );`,
    `ALTER TABLE users 
        add constraint fk_user_addresses
        foreign key (address_id) 
        REFERENCES user_addresses (address_id)
    ;`,
    `CREATE TABLE credit_cards (
        card_id SERIAL PRIMARY KEY,
        user_id INT,
        address_id INT,
        number VARCHAR(16),
        cvs VARCHAR(4),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );`,
    `CREATE TABLE card_addresses (
        address_id SERIAL PRIMARY KEY,
        street_address VARCHAR(200),
        city VARCHAR(100),
        state VARCHAR(100),
        zipcode VARCHAR(30),
        card_id INT,
        FOREIGN KEY(card_id) REFERENCES credit_cards(card_id)
    );`,
    `ALTER TABLE credit_cards
        add constraint fk_card_addresses
        foreign key (address_id)
        REFERENCES card_addresses (address_id)
    ;`,
    `CREATE TABLE items (
        item_id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        category SMALLINT,
        price DECIMAL(13,2),
        total_stock INT,
        shipping_price DECIMAL(13,2),
        shipping_time VARCHAR(100),
        description TEXT,
        stock_by_colors TEXT,
        imageLink TEXT,
        target SMALLINT,
        votes INT,
        points INT,
        stars DECIMAL(2,1)
    );`,
    `CREATE TABLE carts (
        cart_id SERIAL PRIMARY KEY,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );`,
    `CREATE TABLE cart_items (
        cart_items_id SERIAL PRIMARY KEY,
        cart_id INT,
        item_id INT,
        FOREIGN KEY (cart_id) REFERENCES carts(cart_id),
        FOREIGN KEY (item_id) REFERENCES items(item_id)
    );`,
    `CREATE TABLE watch_lists (
        watch_lists_id SERIAL PRIMARY KEY,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );`,
    `CREATE TABLE watch_list_items (
        watch_list_items_id SERIAL PRIMARY KEY,
        item_id INT,
        FOREIGN KEY (item_id) REFERENCES items(item_id)
    );`
]