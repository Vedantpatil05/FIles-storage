const express=require('express');
const { body, validationResult } = require('express-validator');
const router =express.Router();
const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const auth = require('../middleware/auth');


router.get('/register',auth,(req,res)=>{
        res.render('register');
});

router.post('/register',
        body('email').trim().isEmail().isLength({min:10}),
        body('password').trim().isLength({min:5}),
        body('username').trim().isLength({min:4}),
        (req,res)=>{
        const errors=validationResult(req);
        
        if(!errors.isEmpty()){
                return res.status(400).json({
                        errors:errors.array(),
                        message:'Invalid data'});
        }
        
        const {username,email,password}=req.body;

        const hashPass=bcrypt.hashSync(password,10);

        const newUser=new userModel({
                username:username,
                email:email,
                password:hashPass
        })
        res.json(newUser);
});

router.get('/login',(req,res)=>{
        res.render('login');
});

router.post('/login',
        body('username').trim().isLength({min:4}),
        body('password').trim().isLength({min:5}),
        async (req,res)=>{
                const errors=validationResult(req);
        
                if(!errors.isEmpty()){
                        return res.status(400).json({
                                errors:errors.array(),
                                message:'Invalid data'});
                }
                const {username,password}=req.body;

                const user = await userModel.findOne({username:username});

                if(!user){
                        return res.status(400).json({message:'username or password incorrect'});
                }

                const match = await bcrypt.compare(password,user.password);

                if(!match){
                        return res.status(400).json({message:'username or password incorrect'});
                }

                const token=jwt.sign({
                        userId:user._id,
                        username:user.username,
                        email:user.email
                },process.env.JWT_SECRET);

                res.cookie('token',token)
                res.send('Logged in');
});



module.exports=router;