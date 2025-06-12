const { Client } = require('pg')

const checkIfDatabaseExists = async (config,targetDB) => {

    const client  = new Client(config);

    try {

        const conn = await client.connect();
        console.log('Connected to default database ');
        const result  = await client.query(
            `SELECT 1 FROM pg_database WHERE datname=$1`,
            [targetDB],
        )

        if(result.rowCount === 0 )
        {
            await client.query(`CREATE DATABASE ${targetDB}`)
            console.log('Database created successfully')
        }
        
        else
        {
            console.log('Database exists')
        }


    } catch(err){
        console.log(err.message);
    } finally {
        await client.end();
        console.log('Connection closed ')
    }
 
}

checkIfDatabaseExists(
    {
        database: 'postgres',
        port: 5432,
        user: 'ando',
        password: 'postgres',
    },
    'simpleStore',
)




