const express = require('express');
const router = express.Router();

//loading the model
const Login = require('../../models/Login');

//apicalls
router.get('/', (req, res) => {
  Login.find()
    .then(userData => res.json(userData))
    .catch(err => res.status(404).json({ nousersfound: 'No such user found' }));
});

router.post('/', (req, res) => {
  Login.create(req.body)
    .then(login => res.json({ msg: 'Login credentials added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});
0
module.exports = router;