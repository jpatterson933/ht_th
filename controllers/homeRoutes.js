const router = require('express').Router();
const { Products, Users, Cart, Heroes } = require('../models')
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
        const profileData = await Users.findByPk(req.session.user_id)
        const profile = profileData.get({ plain: true });
        const heroData = await Heroes.findAll();
        const hero = heroData.map((heroes) => heroes.get({ plain: true }));
        console.log("herotesting", hero)
        console.log(profile)

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
})


router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/wishlist', async (req, res) => {
    try {
        const userData = await Users.findByPk(req.session.user_id, {
            include: [{
                model: Products,
                through: Cart,
                as: 'products'
            }]
        });
        //you can looop through user.products and add the prices together, it will give us the total
        //once you get that total, you can say products.total products: products.total

        console.log(userData)
        if (!userData) {
            res.render('emptycart')
            // res.status(404).json({ message: 'No cart found with this id!' });
            return;
        }
        const user = userData.get({ plain: true });

        res.render('cart', { products: user.products })
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

module.exports = router;