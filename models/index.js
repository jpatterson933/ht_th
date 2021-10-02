const Users = require('./users');
const Heroes = require('./heroes');

// here we say the user can have many heroes
Users.hasMany(Heroes, {
    foreignKey: 'user_id'
});

module.exports = {
    Users,
    Heroes,
};