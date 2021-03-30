const sequelize = require('../config/connection');
const { Cart } = require('../models');
const Products = require('../models/products');
const Users = require('../models/users')
const productData = require('./products.json');
const userData = require('./users.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Products.bulkCreate(productData, {
    individualHooks: true,
    returning: true,
  });

  await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Cart.create({
    user_id: id,
    products_id: id,
  });

  

  process.exit(0);
};

seedDatabase();