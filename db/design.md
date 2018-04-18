# TABLES
    1) table for a user with attributes: username, email, phonenumber, password, role, foreign_key to address
    2) table for items with attributes: categories[shirts, shorts, footwear, hats, sunglasses, miscellaneous], price, 
        totalStock, shipping, description, stockByColors, target[women, men, boys, girls]  
    3) join table for user address: streetaddress, city, state/province/region, zipcode, user_id foreign key
    4) join table for card address: streetaddress, city, state/province/region, zipcode, card_id foreign key
    5) join table for credit cards with attributes: number, cvs, user_id foreign key address_id foreign key
    6) join table for user's cart with attributes: cart_id, user_id foreign key
    7) join table for cart and items: item_id foregn key
    8) join table for user and watch list: watchList_id foreign key
    9) join table for watch list and items: item_id foreign key
    10) join table for starAmount and item: votes, points, amount, item_id foreign key

# RELATIONSHIPS
    A user has many carts, has many cards, has a watch list, has an address
    A cart belongs to a user, has many items
    A watch list has an user, has many items
    A card belongs to a user, has an address
    A card address belongs to a card
    A user address belongs to a user
