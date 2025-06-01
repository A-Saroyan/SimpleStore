 const fileOperations = require('../utils/fileOperations')
 const JWT = require('../utils/jwt')
 const bcrypt = require('bcrypt')

 const extractJWT = async function (req,res,next)
 {
     const authHeader = req.headers['authorization'];
     if(!authHeader)
     {
         res.status(400).send({message: "Token doesnt exist !!!"})
         return;
     } 
     const token = authHeader.split(' ')[1];
     const decodedData = JWT.Decode(token);
     if(!decodedData)
     {
         res.status(400).send({message: "Invalid Token !!!"});
         return;
     }  
       
     let users = await fileOperations.readData("data/users.json"); 
     if(users.find((user)=> user.username === decodedData.username) && users.find(async(user)=> await bcrypt.compare(user.password,decodedData.password)))
     {   
        req.user = decodedData;
         next();
     }   
     
 }

 module.exports = extractJWT;