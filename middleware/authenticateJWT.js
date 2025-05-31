 const jwt = require('jsonwebtoken')
 const settings =  require('../utils/config')
 const fileOperations = require('../utils/fileOperations')
 const JWT = require('../utils/jwt')
 const extractJWT = async function (req,res,next)
 {
     const authHeader = req.headers['authorization'];
     if(!authHeader)
     {
         res.status(400).send({message: "Token doesnt exist !!!"})
         return;
     } 
     const token = authHeader.split(' ')[1];
     const decodedData = await JWT.Decode(token);
     if(!decodedData)
     {
         res.status(400).send({message: "Invalid Token !!!"});
         return;
     }    
     let users = await fileOperations.readData("data/users.json"); 
     req.headers['authorization'] = decodedData;
     
     if(users.find((user)=> user.username === req.body.username) && users.find(async(user)=> await bcrypt.compare(user.password,req.body.password)))
     {
         next();
     }
     
     //res.status(400).send({message: "JWT token is invalid !!!"}); 
     
 }
 module.exports = extractJWT;