const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth') 
//login page
router.get('/', (req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})
router.get('/paint',ensureAuthenticated,(req,res)=>{
    res.render('paint',{
        user: req.user
    });
})
module.exports = router; 