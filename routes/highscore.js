var router = require('express').Router();
var Score = require('../models').Score;

router.post('/submit', function(req, res){
  console.log(req.body);
  res.send('hello');
});

router.get('/', function(req, res){
  Score.find()
  .select('-user.email')
  .sort({value: 'desc'})
  .exec()
  .then(function(scores){
    res.send(scores);
  }, function(err){
    console.log(err);
    res.send(err);
  });
});

module.exports = router;