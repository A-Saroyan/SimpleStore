const fileOperations = require('./fileOperations')
const bcrypt = require('bcrypt')
const settings = require('./config')
const { body, validationResult } = require('express-validator');


const validateUserRegister = [
    body('name')
      .notEmpty().withMessage('Name is required'),
  
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email is not valid')
      .custom(async (value) => {
        const users = await fileOperations.readData('data/users.json');
        if (users.some(user => user.email === value)) {
          throw new Error('This email is already in use');
        }
        return true;
      }),
  
    body('password')
      .notEmpty().withMessage('Password is required'),
  
    body('age')
      .notEmpty().withMessage('Age is required')
      .isInt({ min: settings.ValidAge }).withMessage(`You must be at least ${settings.ValidAge} years old`),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];    


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

    //req.body.role = user.role 
    
    next();
    
}







module.exports = {validateUserRegister,checkUserExist};