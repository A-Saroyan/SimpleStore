const express = require('express')
const validations = require('./utils/vallidations')
const settings = require('./utils/config')
const utils = require('./utils/utils')
const JWT = require('./utils/jwt')
const bcrypt = require('bcrypt')



const app = express();
app.use(express.json());


app.post("/auth/login",validations.checkUserExist,JWT.CreateToken,(req,res)=> {


})



app.post("/auth/register",validations.validateUserRegister,async (req,res)=> {

    try 
        {
    
        req.body.password = await bcrypt.hash(req.body.password,settings.SaltRound)        
        req.body.role = 'user',
        utils.writeData('data/users.json',req.body)        
        res.status(201).json({message: "You are registered successfully !!!"});
        } 

    catch(err) 
        {
        res.status(400).json({message: err.message})
        }
   
})




app.listen(settings.PORT,()=> {console.log(`Server is running on http://localhost:${settings.PORT}  !!!`)});