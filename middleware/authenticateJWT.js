const jwt = require('jsonwebtoken')
const settings =  require('./config')
const fileOperations = require('../utils/fileOperations')


const extractJWT = async function (req,res,next)
{
    const token = req.headers['authorization'];

    if(!token)
    {
        res.status(400).send({message: "Token doesnt exist !!!"})
        return;
    } 

    
    const decodedData = await jwt.verify(token,settings.SECRET);

    let users =  await fileOperations.readData("data/users.json"); 
    req.body  = decodedData;

    if(users.find((user)=> user.username === req.body.username) && users.find((user)=> bcrypt.compare(user.password,req.body.password)))
        {
            next();
        }

    else
    {
        res.status(400).send({message: "JWT token is invalid !!!"});
        return;
    }  
    
}


module.exports = extractJWT;