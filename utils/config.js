require('dotenv').config()


const settings = {

    PORT: process.env.PORT,
    SECRET: process.env.secret_key,
    SaltRound: Number(process.env.SaltRound),
    ValidAge:Number(process.env.ValidAge),
    superUser:process.env.superUser

};

module.exports = settings;

