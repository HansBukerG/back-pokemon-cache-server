import { MongoClient } from 'mongodb';

const mongoConnectionScheme = process.env.MONGO_CONNECTION_SCHEME;
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDatabase = process.env.MONGO_DATABASE;
const mongoPokeApiCollection = process.env.MONGO_POKEAPI_COLLECTION;
const mongoDigiApiCollection = process.env.MONGO_DIGIAPI_COLLECTION;

const mongoUri = `${mongoConnectionScheme}://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}`;

export const mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

export const getDbConnection = async () =>
{
  if(mongoClient == undefined){
    try
    {
      console.log(`Setting up a new connection to: ${mongoUri}`);
      await mongoClient.connect();
    } catch (error)
    {
      console.error('Error connecting to MongoDB', error);
      throw error;
    }
  }
  const database = mongoClient.db(mongoDatabase);
  return database;
};

export const getCollection = async (name) => {
  const database = await getDbConnection();
  return database.collection(name);
};

export const getPokeApiCollection = async () => {
  return await getCollection(mongoPokeApiCollection);
};

export const getDigiApiCollection = async () => {
  return await getCollection(mongoDigiApiCollection);
};