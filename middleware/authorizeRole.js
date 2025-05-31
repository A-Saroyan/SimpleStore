const jwt = require('jsonwebtoken')
const settings =  require('../utils/config')
const fileOperations = require('../utils/fileOperations')
//const extractJWT = require('./authenticateJWT')


const isAdmin = function(req,res,next)
{
    let decoded =  req.headers['authorization'] ;


    if(decoded.role === settings.superUser)
    {
        next ();
    }
    
    else
    {
        res.send(403).send({message: "You dont have permissions for this operation !!!"})
    }

    
}


module.exports = isAdmin
