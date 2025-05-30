const validations = require('../utils/vallidations') 
const JWT = require('../utils/jwt')
const bcrypt = require('bcrypt')
const settings = require('../utils/config')
const fileOperations = require('../utils/fileOperations')

const express = require('express');
const authRouter = express.Router();

authRouter.post("/login",validations.checkUserExist,JWT.CreateToken,  (req,res)=> {

})

authRouter.post("/register",validations.validateUserRegister,async (req,res)=> {

    try 
        {
    
        req.body.password = await bcrypt.hash(req.body.password,settings.SaltRound)        
        req.body.role = 'user',
        fileOperations.writeData('data/users.json',req.body)        
        res.status(201).json({message: "You are registered successfully !!!"});
        } 

    catch(err) 
        {
        res.status(400).json({message: err.message})
        }
   
})


module.exports = authRouter