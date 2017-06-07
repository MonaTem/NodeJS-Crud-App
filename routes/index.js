var express = require('express');
var homeCtrl = require('../controllers/homeCtrl');
var dbManager = require('../database');
var router = express.Router();
var bodyParser = require('body-parser')
var urlEndcodedParser = bodyParser.urlencoded({ extended: false })
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
});

router.get('/getPeople', function (req, res, next) {
  dbManager.getPeople().then(p =>
    res.json(p)
  )
});

router.post('/updatePerson', urlEndcodedParser, function (req, res) {
  let id = req.body.id
  if (id) {
    dbManager.updatePerson(id, req.body.firstName, req.body.lastName, req.body.age)
  }
  res.redirect('/')
});

router.post('/addPerson', urlEndcodedParser, function (req, res) {
  dbManager.addPerson(req.body.firstName, req.body.lastName, req.body.age)
  res.redirect('/')
});

router.post('/deletePerson', urlEndcodedParser, function (req, res) {
  dbManager.deletePerson(req.body.id)
  res.redirect('/')
});


module.exports = router;
