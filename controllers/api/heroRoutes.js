const router = require('express').Router();
const { Heroes } = require('../../models');

// grabs all products
router.get('/', async (req, res) => {
    const heroData = await Heroes.findAll()
    res.json(heroData) 
    console.log(heroData);

  });

module.exports = router;