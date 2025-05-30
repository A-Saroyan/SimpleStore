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
    const { username, password } = req.body;

    if(!password)  
    {
        return res.status(400).json({ error: 'Password is required!!!' });
    }

    if(!username)  
    {
        return res.status(400).json({ error: 'Username is required!!!' });
    }

    const users = await fileOperations.readData('./data/users.json');
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(400).json({ message: 'Wrong username or password !!!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong username or password !!!' });
    }

    next();
    
}




module.exports = {validateUserRegister,checkUserExist};