const express = require('express');
const router = express.Router();

//loading the model
const Acc = require('../../models/UserAcc');

//apicalls
router.get('/', (req, res) => {
    Acc.find()
      .then(accData => res.json(accData))
      .catch(err => res.status(404).json({ nousersfound: 'No such account found' }));
});

router.post('/', (req, res) => {
   Acc.create(req.body)
     .then(acoount => res.json({ msg: 'Account updated successfully' }))
     .catch(err => res.status(400).json({ error: 'Unable to add to this account' }));
});

router.put('/:id', (req, res) => {
  Acc.findByIdAndUpdate(req.params.id, req.body)
    .then(account => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});
router.get('/:id', (req, res) => {
  Acc.findById(req.params.id)
    .then(acc => res.json(acc))
    .catch(err => res.status(404).json({ noblogfound: 'No such Account found' }));
});
router.delete('/:id', (req, res) => {
  Acc.findByIdAndRemove(req.params.id, req.body)
    .then(blog => res.json({ mgs: 'Account deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such blog to be deleted' }));
});

module.exports=router;