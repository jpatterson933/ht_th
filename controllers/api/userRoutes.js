const router = require('express').Router();
const { Users } = require('../../models')

// grabs all users
router.get('/', async (req, res) => {
  const userData = await Users.findAll()
  res.json(userData)
})

// responsible for creating a new user and logging them in
router.post('/', async (req, res) => {
  Users.create(req.body)
    .then(response => {
      req.session.save(() => {
        req.session.user_id = response.id;
        req.session.logged_in = true;
        res.status(200).json(response)
      })
    }).catch(err => {
      console.log(err)
      res.status(400).json(err);
    });
});

//responsible for user logging in
router.post('/login', async (req, res) => {
  try {
    const userData = await Users.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
    //trying to explicitly connect scripts 
    // const scripts = "/js/login.js";
    // res.render('login', scripts);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router