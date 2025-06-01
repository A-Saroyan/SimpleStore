const fileOperations = require('../utils/fileOperations')
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole')

const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/',authenticateJWT,authorizeRole,async(req,res)=> {
    
    let users = await fileOperations.readData('data/users.json');
    res.status(200).json(users);

});

module.exports = usersRouter