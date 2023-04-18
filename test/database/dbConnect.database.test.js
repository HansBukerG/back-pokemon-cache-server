import { mongoClient, getDbConnection, getPokeApiCollection, getDigiApiCollection } from '../../src/database/dbConnect.database.js';

describe('Should get a connection from the database', () =>{

  test('Should get a response from pokeApi Collection', async()=>{
    try
    {
      const dbConnection = await getDbConnection();
      console.log('Ping to database was successful');

      const pokeApiCollection = getPokeApiCollection();
      const digiApiCollection = getDigiApiCollection();

      const pokeApiDocsCount = (await pokeApiCollection).countDocuments();
      const digiApiDocsCount = (await digiApiCollection).countDocuments();

      console.log(`pokeApi collection has ${(await pokeApiDocsCount).valueOf()} documents`);
      console.log(`digiApi collection has ${(await digiApiDocsCount).valueOf()} documents`);

    } catch (error)
    {
      console.log(`Error executing test: ${error}`);
      fail();
    }finally{
      await mongoClient.close();
    }

  });

});