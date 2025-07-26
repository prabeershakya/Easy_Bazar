const { sequelize } = require('../DB/Database');
const { DataTypes } = require('sequelize');

const User = require('./user')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const Wishlist = require('./wishlist')(sequelize, DataTypes);

User.hasMany(Product, { foreignKey: "sellerid", as: "products" });
Product.belongsTo(User, { foreignKey: "sellerid", as: "seller" });

// Wishlist associations
User.belongsToMany(Product, { through: Wishlist, foreignKey: 'userId', as: 'wishlistProducts' });
Product.belongsToMany(User, { through: Wishlist, foreignKey: 'productId', as: 'wishlistedByUsers' });

// Add these associations for include to work
Wishlist.belongsTo(User, { foreignKey: 'userId' });
Wishlist.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { User, Product, Wishlist, sequelize };
