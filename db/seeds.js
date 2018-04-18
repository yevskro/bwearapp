"use strict"
const categories = {shirt: 1, shorts: 2, footwear: 3, hats: 4, sunglasses: 5, miscellaneous: 6}
const target = {women: 1, girls: 2, men: 3, boys: 4}

const userQueries = [
    `INSERT INTO users (name, email, phone_number, password, role, create_date) 
        VALUES
    ('tehcoyote', 'email@email.com', '8624560190', 'encrypted', 0, now());`,
    `INSERT INTO users (name, email, phone_number, password, role, create_date) 
        VALUES
    ('durran', 'durran@email.com', '8614530190', 'encrypted', 0, now());`   
]

const userAddressQueries = [
    `INSERT INTO user_addresses (street_address, city, state, zipcode, user_id) 
        VALUES
    ('2056 Graves Neck Rd', 'Brooklyn', 'New York', 11223, 1);`,
    `INSERT INTO user_addresses (street_address, city, state, zipcode, user_id)
        VALUES
    ('333 Kentucky Drive', 'Smallville', 'Kentucky', 12312, 2);`  
]

const cardQueries = [
    `INSERT INTO credit_cards (number, cvs, user_id) 
        VALUES
    ('2056205620562056', '111', 1);`,
    `INSERT INTO credit_cards (number, cvs, user_id)
        VALUES
    ('3344334433443344', '333', 2);`  
]

const cardAddressesQueries = [
    `INSERT INTO card_addresses (street_address, city, state, zipcode) 
        VALUES
    ('2056 Graves Neck Rd', 'Brooklyn', 'New York', 11223);`,
    `INSERT INTO card_addresses (street_address, city, state, zipcode)
        VALUES
    ('333 Kentucky Drive', 'Smallville', 'Kentucky', 12312);`
]

const updateForeignKeys = [
    `UPDATE credit_cards SET address_id = 1 WHERE user_id = 1;`,
    `UPDATE credit_cards SET address_id = 2 WHERE user_id = 2;`,
    `UPDATE card_addresses SET card_id = 1 WHERE address_id = 1`,
    `UPDATE card_addresses SET card_id = 2 WHERE address_id = 2`
]

const itemQueries = [
    `INSERT INTO items (name, price, total_stock, category, shipping_price, shipping_time, description, stock_by_colors, imageLink, target, votes) 
        VALUES
    ('Bananas', 12.99, 10, ${categories.shirt}, 5.99, '2 days', 'Ad adipisicing nulla aute et. Ipsum fugiat sunt exercitation excepteur qui id sit anim tempor. Consequat do nulla est do ullamco est nulla veniam ad aute. Id eiusmod sit voluptate voluptate excepteur non fugiat nostrud.',
        'blue:3,green:4,black:3', '', ${target.men}, 2);`,
    `INSERT INTO items (name, price, total_stock, category, shipping_price, shipping_time, description, stock_by_colors, imageLink, target) 
        VALUES
    ('Sandles', 24.99, 10, ${categories.footwear}, 3.99, '3 days', 'Cillum culpa sint sint eu culpa culpa ea consequat. Ad aliquip quis esse consectetur aliqua qui eiusmod. Proident irure excepteur do cillum officia occaecat reprehenderit incididunt. In ex dolore deserunt amet.',
        'dark green:4,peach:4,blue:2', '', ${target.women});`
]

module.exports = [].concat(userQueries).concat(userAddressQueries).concat(cardQueries).concat(cardAddressesQueries).concat(updateForeignKeys).concat(itemQueries)