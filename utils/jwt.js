const jwt = require('jsonwebtoken')
const settings =  require('./config')
const bcrypt = require('bcrypt')

const CreateToken = async function (req,res,next)
{
    let hashedPassword = await bcrypt.hash(req.body.password,settings.SaltRound)

    const payload = {
        username: req.body.username,
        password: hashedPassword,
        role: 'user'
    }

    const token = jwt.sign(payload, settings.SECRET, { expiresIn: '1h'});
    
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json({ message: 'Logged in successfully' });

}




const Decode = function (token) {

    jwt.verify(token,settings.SECRET);

}

//console.log(Decode);


module.exports = {CreateToken,Decode}