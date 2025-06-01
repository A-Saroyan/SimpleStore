const validations = require('../utils/vallidations') 
const JWT = require('../utils/jwt')
const bcrypt = require('bcrypt')
const settings = require('../utils/config')
const fileOperations = require('../utils/fileOperations')
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole')


const express = require('express');
const productsRouter = express.Router();

productsRouter.get('/',async(req,res)=> {
    
    let products = await fileOperations.readData('data/products.json');
    res.status(200).json(products);

});


productsRouter.get('/:id',async (req,res)=> {

    let products = await fileOperations.readData('data/products.json');   
    let product_id = Number(req.params.id);
    
    let result = products.find((u) => u.id === product_id);
    if (!result) {
        return res.status(404).json({ message: 'Product not found' });
      }
    res.status(200).json(result);

});


productsRouter.post('/',authenticateJWT,authorizeRole,async (req,res)=> {

    let products = await fileOperations.readData('data/products.json');   
    let  newProduct = {
        id: products.length +1,          
        ...req.body         
      };
    await fileOperations.writeData('data/products.json',newProduct);
    res.status(201).send({message: "product created"});

})

module.exports = productsRouter