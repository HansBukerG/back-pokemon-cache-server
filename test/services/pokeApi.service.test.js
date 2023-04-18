import pokeApiService from '../../src/services/pokeApi.Service';
import { getPokeApiCollection } from '../../src/database/dbConnect.database';

describe('Collection Services should work properly', () =>
{
  let insertedId = null;

  beforeAll(async () =>
  {
    const newData = { id: 1, name: 'Test Data' };
    insertedId = await pokeApiService.insert(newData);
  });

  it('Should return all records', async () =>
  {
    const result = await pokeApiService.getAll();
    console.log(result);
  });

  it('Should return a record by id', async () =>
  {
    const result = await pokeApiService.getById(1);
    console.log(result);
  });

  it('Should insert a new record', async () =>
  {
    const newData = { id: 2, name: 'New Test Data' };
    const result = await pokeApiService.insert(newData);
    expect(typeof result).not.toBe('undefined');
    afterAll(async() => {
      const collection = await getPokeApiCollection();
      await collection.deleteOne({ _id: result });
    });
  });

  // Eliminar el registro insertado en las pruebas
  afterAll(async () =>
  {
    const collection = await getPokeApiCollection();
    await collection.deleteOne({ _id: insertedId });
  });
});
