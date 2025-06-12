const validations = require('../utils/vallidations') 
const JWT = require('../utils/jwt')
const fileOperations = require('../utils/fileOperations')
const {initUsersTable,createUser} = require('../models/userModel')

const express = require('express');
const authRouter = express.Router();

initUsersTable();

authRouter.post("/login",validations.checkUserExist,JWT.CreateToken,(req,res)=> {

    res.status(200).json({ message: 'Logged in successfully' });

})

authRouter.post("/register",validations.validateUserRegister,async (req,res)=> {

    try 
        {   
    
        
        //fileOperations.writeData('data/users.json',req.body)        
        const  result = await createUser(req.body);
        res.status(201).json({message: "You are registered successfully !!!"});
        } 

    catch(err) 
        {
        res.status(400).json({message: err.message})
        }
   
})


module.exports = authRouter