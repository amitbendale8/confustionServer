var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Users = require('../models/user');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', cors.corsWithOptions,function(req, res, next) {
  Users.find({})
  .then((users)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(users);
  },(err) => next(err))
  .catch((err) => next(err));
});

router.post('/signup', cors.corsWithOptions,(req, res, next) => {
  console.log("Inside signup");
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      console.log("Something bad..")
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if(req.body.firstname){
        user.firstname = req.body.firstname;
      }
      if(req.body.lastname){
        user.lastname = req.body.lastname;
      }
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return;
        }else{
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
          });
        }
      });
      
    }
  });
});

router.post('/login',cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
 
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,token: token, status: 'You are successfully logged in!'});
});


router.get('/logout',cors.corsWithOptions,(req,res,next)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }else{
    var err = new Error("You are not logged in");
    err.status = 403;
    next(err);
  }
})


router.get('/facebook/token', passport.authenticate('facebook-token'),(req,res) =>{
  if(req.user){
    var token = authenticate.getToken({_id: req.user._id});
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});
module.exports = router;
