const Users = require('./users')
const Products = require('./products')
const Heroes = require('./heroes');

// here we say the user can have many heroes
Users.hasMany(Heroes, {
    foreignKey: 'user_id'
})

module.exports = {
    Users,
    Products,
    Heroes,
};