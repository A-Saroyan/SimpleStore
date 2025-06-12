const { Pool } = require('pg')

const pool = new Pool ({

    
    database: 'postgres',
    port: 5432,
    user: 'ando',
    password: 'postgres'
    
});

const db = async (text,data) => {

    try{
        return pool.query(text,data);
    } catch(err)
    {
        console.log(err.message);
        throw err;
    }
}



module.exports = db;