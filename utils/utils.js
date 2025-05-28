const fs = require('fs').promises   
const path = require('path')

const readData = async (filename) => {
    try {
        const filePath = path.resolve(filename);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
        } 

    catch (err) 
        {
        throw new Error('Something went wrong(readData) !!!');
        }
};


const writeData = async (filename,data) => {

    const filePath = path.resolve(filename);

    let users = await readData(filename);
    users.push(data);

   await fs.writeFile (filePath,JSON.stringify(users,null,2),(err,data)=> {
        if(err)
        {
            throw new Error ('Something went wrong(writeData) !!!')
        }

    })
};


module.exports = {writeData,readData}