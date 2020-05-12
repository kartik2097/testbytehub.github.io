const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const user = require('../Databse/Model.js');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');



router.use(bodyparser.urlencoded({extended:true}));

router.use(cookieParser('secret'));
router.use(session({
  secret : 'secret',
  maxAge : 3600000,
  resave : true,
  saveUninitialized : true,
}))

router.use(passport.initialize());
router.use(passport.session());

mongoose.connect('mongodb+srv://kartik:kartikbytehub@userdb-klqi1.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser:true,useUnifiedTopology:true,
}).then(()=>console.log("Database Connected")
);

/* GET home page. */

router.get('/',function(req,res){
  res.render('index');
})
router.get('/register',function(req,res){
  res.render('register');
})
router.post('/register',(req,res)=>{
  var {email, password, confirmpassword } = req.body;
  var err;
  if(!email || !password || !confirmpassword){
    err = "Please Fill all the fields";
    res.render('register', {'err' : err} );
  } 
  if(password != confirmpassword){
    err = "Password do not match";
    res.render('register', {'err' : err} );
  }
   if(typeof err == 'undefined'){
    user.findOne({email : email},function(err,data){
      if(err) throw err;
      if(data){
        console.log('user exist');
        err = 'User already exist';
        res.render('register', {'err' : err});
      }else{
        bcrypt.genSalt(10,(err,salt)=>{
          if(err) throw err;
          bcrypt.hash(password, salt, (err,hash)=>{
            if(err) throw err;
            password = hash;
            user({
              email,
              password,
            }).save((err,data)=>{
              if(err) throw err;
              res.redirect("/login");
            });
          })
        })
      }
    });
  }
});









var localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy({ usernameField:'email'},(email, password, done)=>{
  user.findOne({email : email },(err,data)=>{
    if(err) throw err;
    if(!data){
      return done(null, false);
    }
    bcrypt.compare(password, data.password, (err,match)=>{
      if(err){
        return done(null, false);
      }
      if(!match){
        return done(null, false);
      }
      if(match){
        return done(null, data);
      }
    })
  })
}));

passport.serializeUser(function(user,cb){
  cb(null,user.id);
});
passport.deserializeUser(function(id,cb){
  user.findById(id,function(err,user){
    cb(err,user)
  })
});

router.get('/login',(req,res)=>{
  res.render("login");
});
 router.post('/login',(req,res,next)=>{
   passport.authenticate('local',{
     failureRedirect: '/login',
     successRedirect: '/',
   })(req,res,next);
 });

 router.get('/about',(req,res)=>{
  res.render("about_us");
});
router.get('/school',(req,res)=>{
  res.render("school");
});
router.get('/student',(req,res)=>{
  res.render("student");
});
router.get('/media',(req,res)=>{
  res.render("media");
});
router.get('/event',(req,res)=>{
  res.render('event1');
})
router.get('/Registration',(req,res)=>{
  res.render('eventRegister');
})




module.exports = router;
