require('dotenv').config()


const settings = {

    PORT: process.env.PORT,
    SECRET: process.env.secret_key,
    SaltRound: Number(process.env.SaltRound),
    ValidAge:process.env.ValidAge

};

module.exports = settings;

