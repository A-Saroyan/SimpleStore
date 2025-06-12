const db = require('../database/database')
const bcrypt = require('bcrypt')
const settings = require('../utils/config')


const initUsersTable = async () => {
    await db(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        age INT NOT NULL,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(100) NOT NULL,
        role VARCHAR (10) NOT NULL);`
    )
}

const createUser = async (user) => {


    user.password = await bcrypt.hash(user.password,settings.SaltRound)     ;   
    user.role = 'user';
    const {name,age,username,email,password,role} = user;

   

    return await db(`
        INSERT INTO users  (name,age,username,email,password,role)
        VALUES   ($1,$2,$3,$4,$5,$6) ;`
        ,[name,Number(age),username,email,password,role]);
}


const getAllUsers = async () => {

    let result =  await db(` SELECT * FROM users;`,[ ]);
    return result.rows;
}

const getUserById = async (id) => {

    let result =  await db(` SELECT * FROM users WHERE id = ${id};`,[ ]);
    return result.rows;
}

const deleteUserById = async (id) => {

    let result =  await db(` DELETE  FROM users WHERE id = ${id} RETURNING *;`,[ ]);
    return result.rows;
}

const deleteUserByEmail = async (email) => {

    let result =  await db(` DELETE  FROM users WHERE email = $1 RETURNING *;`,[email]);
    return result.rows;
}



const updateUserById = async (id,user) => {

    user.password = await bcrypt.hash(user.password,settings.SaltRound)  
    const {name,age,username,email,password} = user

    let result =  await db(` 
    UPDATE users 
    SET name = $1, age = $2,username = $3,email = $4,password =$5 
    WHERE id = $6
    RETURNING *; `,[name,age,username,email,password,id]);
    return result.rows;

}

module.exports = {initUsersTable,
                  createUser,
                  getAllUsers,
                  getUserById,
                  deleteUserById,
                  updateUserById}