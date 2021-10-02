const router = require('express').Router();
const { Heroes } = require('../../models');

// grabs all products
router.get('/', async (req, res) => {
    const heroData = await Heroes.findAll()
    res.json(heroData) 
    console.log(heroData);

  });

router.get('/', async (req, res) => {
    const characterData = await Heroes.findAll();
    console.log("characterdata", characterData)
    const character = characterData.map((characters) => characters.get({ plain: true }))
    console.log(character)
    res.render('character', character)
})

module.exports = router;