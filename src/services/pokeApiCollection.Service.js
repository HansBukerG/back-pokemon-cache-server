import { getPokeApiCollection } from '../database/dbConnect.database.js';

const getAll = async () =>
{
  const collection = await getPokeApiCollection();
  const result = await collection.find({}).toArray();
  return result;
};

const getById = async (id) =>
{
  const collection = await getPokeApiCollection();
  const result = await collection.findOne({ id: parseInt(id) });
  if (result === null)
  {
    return null;
  }
  return result;
};

const getByName = async (name) =>
{
  const collection = await getPokeApiCollection();
  const regex = new RegExp(name, 'i');
  const result = await collection.findOne({ name: regex });
  if (result === null)
  {
    return null;
  }
  return result;
};

const getPokemon = async (name) =>{
  if (isNaN(name)) {
    return await getByName(name);
  }
  
  return await getById(name);
};

const insert = async (data) =>
{
  try
  {
    const collection = await getPokeApiCollection();
    const result = await collection.insertOne(data);
    return result;
  } catch (error)
  {
    console.error(error);
    return undefined;
  }
};

export default { getAll, getById, getByName, insert, getPokemon };
