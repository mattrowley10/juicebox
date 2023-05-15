const { client, getAllUsers, createUser, updateUser } = require('./index');


async function createInitialUsers(){
    try{
        console.log("Starting to create users...");

        const albert = await createUser({ username: 'albert', password: 'bertie99', name: 'albert', location: 'south africa'})
        const sandra = await createUser({ username: 'sandra', password: 'sandra1', name: 'sandra', location: 'spain'})
        const glamgal = await createUser({ username: 'glamgal', password: 'glamgal1', name: 'britney', location: 'montreal'})
        console.log(albert)

        console.log("Finished creating users!")
    } catch (error) {
        throw error
    }
}

async function dropTables() {
    try {
        console.log("Starting to Drop Tables...");
       await client.query(`
        DROP TABLE IF EXISTS users;
        `)

        console.log("Finished Dropping Tables...")
    } catch (error) {
        throw error;
    }
}

async function createTables(){
    try {
        console.log("Starting to build tables...");

        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            name varchar(255) NOT NULL,
            location varchar(255) NOT NULL,
            active BOOLEAN DEFAULT true
        );
        `);
        console.log("Finished building tables...");
    } catch (error) {
        throw error;
    }
}

async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
    } catch (error) {
      throw error;
    } 
  }
  

async function testDB() {
    try {
        console.log("Starting to test database...");

        const users = await getAllUsers();
        console.log("getAllUsers:", users);

        console.log("calling update on user 1")
        const updateUserResult = await updateUser(users[0].id, {
            name: "Steve",
            location: "Youtube"
        });
        console.log("Result:", updateUserResult);

        console.log("Finished database tests!");
    } catch (error) {
        console.error(error);
    }
}
rebuildDB()
.then(testDB)
.catch(console.error)
.finally(()=>client.end())