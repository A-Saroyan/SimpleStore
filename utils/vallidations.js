const fileOperations = require('./fileOperations')
const bcrypt = require('bcrypt')
const settings = require('./config')


function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }


const  validateUserRegister =  async function (req,res,next)
{
   

     if(req.body.email === "" || req.body.name === "" || req.body.age == "" || req.body.password === "" )
    {
        res.status(400).send({message: "Please fill all fileds"});
        return;
    }

    if(Number(req.body.age) < settings.ValidAge)
    {
            res.status(400).send({message: "You are not adult !!!"});
            return;
    }

    if(!isValidEmail(req.body.email))
    {
        res.status(400).send({message: "Email is not vaild !!!"});
        return;
    }

   let users =  await fileOperations.readData("data/users.json"); 
   
    
   if(users.find((user)=> user.email === req.body.email))
   {
        res.status(400).send({message: "Your email has used already used !!!"});
        return;
   }

    next(); 
    
}


const checkUserExist = async function (req,res,next)
{
    let users =  await fileOperations.readData("data/users.json"); 
    let hashedPassword = await bcrypt.hash(req.body.password,settings.SaltRound)


    if(users.find((user)=> user.username === req.body.username) && users.find((user)=> bcrypt.compare(user.password,hashedPassword)))
    {
            next();
    }

    else
    {
        res.status(400).send({message: "Wrong username or password !!!"});
        return;
    }  
    
}




module.exports = {validateUserRegister,checkUserExist};