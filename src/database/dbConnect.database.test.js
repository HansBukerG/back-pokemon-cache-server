import  {dbClient} from './dbConnect.database';

describe('Should get a connection from the database', () =>{
    test('Should get a connection to MongoDB', async () => {

        try {
            await dbClient.connect();
            // Establish and verify connection
            const result = await dbClient.db("promotions").command({ ping: 1 });
            console.log(`result: ${result}`);
        } catch (error) {
            console.log(error);
        } finally {
            await dbClient.close(); 
        }
    });
});