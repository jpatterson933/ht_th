const router = require('express').Router();
const productsApi = require('./products-api-grab');
const userRoutes = require('./userRoutes');
const heroRoutes = require('./heroRoutes');

router.use('/users', userRoutes);
router.use('/products', productsApi);
router.use('/heroes', heroRoutes);

module.exports = router;