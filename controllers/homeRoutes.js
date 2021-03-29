const router = require('express').Router();


router.get('/', async (req, res) => {
    res.render('homepage')
    res.render('twentyone')
})

// router.get('/login', async (req, res) => {
//     res.render('login')
// })

router.get('/products', async (req, res) => {
    res.render('products')
})

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    // if (req.session.logged_in) {
    //   res.redirect('/profile');
    //   return;
    // }
  
    res.render('login');
  });

router.get('/profile', (req, res) => {
    res.render('profile')
})

router.get('/cart', (req, res) => {
    res.render('cart')
})
  

module.exports = router;