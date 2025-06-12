const fileOperations = require('../utils/fileOperations')
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');
const {getAllUsers,getUserById,deleteUserById,updateUserById} = require('../models/userModel')

const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/',authenticateJWT,authorizeRole,async(req,res)=> {
    
    //let users = await fileOperations.readData('data/users.json');
    let users =   getAllUsers;
    res.status(200).json(users);

});

usersRouter.get('/:id',async (req,res)=> {

      
    let  user_id = Number(req.params.id);
    
    let result = await getUserById(user_id)
    if (!result.length) {
        return res.status(404).json({ message: 'user not found' });
      }
    res.status(200).json(result);

});

usersRouter.delete('/:id',async (req,res)=> {

      
    let  user_id = Number(req.params.id);
    
    let result = await deleteUserById(user_id)
    if (result.length === 0) {
        return res.status(404).json({ message: 'user not found' });
      }
    

    res.status(200).json({ message: 'Deleted user', user: result[0] });

});


usersRouter.patch('/:id',async (req,res)=> {

      
    let  user_id = Number(req.params.id);
    
    let result = await updateUserById(user_id,req.body)
    if (result.length === 0) {
        return res.status(404).json({ message: 'user not found' });
      }
    

    res.status(200).json({ message: 'Updated user ', user: result[0] });

});




module.exports = usersRouter