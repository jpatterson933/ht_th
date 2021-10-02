const router = require('express').Router();
const { Products, Users, Heroes } = require('../models')
const withAuth = require('../utils/auth')

router.get('/products', async (req, res) => {
    try {
        const productData = await Products.findAll();
        const product = productData.map((products) => products.get({ plain: true }));
        res.render('products', { product });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const productId = await Products.findByPk(req.params.id);
        const prodId = productId.get({ plain: true });
        res.render('product', prodId);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        // Issue: Need to only pull the heroes with the associated id that belongs to the user who is logged in
        const profileData = await Users.findByPk(req.session.user_id)
        const profile = profileData.get({ plain: true });
        const heroData = await Heroes.findAll();
        const hero = heroData.map((heroes) => heroes.get({ plain: true }));
        res.render('profile', { profile, hero });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/homepage', async (req, res) => {
    try {
        const productData = await Products.findAll();
        const product = productData.map((products) => products.get({ plain: true }));
        const ranIndex = Math.floor(Math.random() * (product.length - 1))
        res.render('homepage', product[ranIndex]);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/contact', (req, res) => {
    res.render('contact')
});


router.get('/signup', (req, res) => {
    res.render('signup')
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;