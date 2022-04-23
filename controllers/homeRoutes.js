const router = require('express').Router();
const { Users, Heroes } = require('../models')
const withAuth = require('../utils/auth')

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

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
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