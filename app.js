const express = require('express')
const settings = require('./utils/config')
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products')


const app = express();
app.use(express.json());

app.use('/auth',authRouter);
app.use('/products',productsRouter);


app.listen(settings.PORT,()=> {console.log(`Server is running on http://localhost:${settings.PORT}  !!!`)});