const jwt = require('jsonwebtoken')
const settings =  require('./config')
const bcrypt = require('bcrypt')

const CreateToken = async function (req,res,next)
{

    if(!req.body.password)  
    {
        return res.status(400).json({ error: 'Password is required' });
    }

    

    let hashedPassword = await bcrypt.hash(req.body.password,settings.SaltRound)

    const payload = {
        username: req.body.username,
        password: hashedPassword,
        user: req.body.role
    }

    const token = jwt.sign(payload, settings.SECRET, { expiresIn: '1h'});
    
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json({ message: 'Logged in successfully' });

    next();

}




const Decode = function (token) {

      
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

//console.log(Decode);


module.exports = {CreateToken,Decode}