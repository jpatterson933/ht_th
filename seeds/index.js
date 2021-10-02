const sequelize = require('../config/connection');
const { Cart } = require('../models');
const Products = require('../models/products');
const Heroes = require('../models/heroes');
const heroData = require('./heroes.json');
const productData = require('./products.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // seed database with our heroes
  await Heroes.bulkCreate(heroData, {
    individualHooks: true,
    returning: true,
  });

  await Products.bulkCreate(productData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};
seedDatabase();