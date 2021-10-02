const router = require('express').Router();
const { Products } = require('../../models');


// grabs all products
router.get('/', async (req, res) => {
  const productsData = await Products.findAll()
  res.json(productsData) 
});

module.exports = router