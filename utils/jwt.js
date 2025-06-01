const jwt = require('jsonwebtoken')
const settings =  require('./config')
const bcrypt = require('bcrypt')
const fileOperations = require('./fileOperations')

const CreateToken = async function (req,res,next)
{

    if(!req.body.password)  
    {
        return res.status(400).json({ error: 'Password is required' });
    }

    let hashedPassword = await bcrypt.hash(req.body.password,settings.SaltRound);
    let users =  await fileOperations.readData("data/users.json"); 

    let user  =  users.find((user)=> user.username === req.body.username);

    const payload = {
        username: req.body.username,
        password: hashedPassword,
        role: user.role
    }

    const token = jwt.sign(payload, settings.SECRET, { expiresIn: '1h'});
    res.setHeader('Authorization', `Bearer ${token}`);

    next();
}


const Decode = function (token) 
{   
    try 
    {
        let decoded_token = jwt.verify(token,settings.SECRET);
        return decoded_token;
    }
     
    catch(err)
    {
        console.error('Token is invalid');
        return null;
    }
}

module.exports = {CreateToken,Decode}