import { MongoClient } from 'mongodb';
import { MONGO_CONNECTION_SCHEME, 
  MONGO_DATABASE,
  MONGO_DIGIAPI_COLLECTION,
  MONGO_HOST,
  MONGO_MANGADEX_CHAPTER_IMAGES,
  MONGO_PASSWORD,
  MONGO_POKEAPI_COLLECTION,
  MONGO_PORT,
  MONGO_USER,  
} from '../../environments/environment.js';

const mongoUri = `${MONGO_CONNECTION_SCHEME}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

export const mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

export const getDbConnection = async () =>
{
  try {
    if (mongoClient == undefined)
    {
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
    const database = mongoClient.db(MONGO_DATABASE);
    return database;
  } catch (error) {
    console.error(`getDbConnection() error: ${error}`);
  }

};

export const getCollection = async (name) => {
  const database = await getDbConnection();
  return database.collection(name);
};

export const getPokeApiCollection = async () => {
  return await getCollection(MONGO_POKEAPI_COLLECTION);
};

export const getDigiApiCollection = async () => {
  return await getCollection(MONGO_DIGIAPI_COLLECTION);
};

export const getMangaChapterCollection = async () => {
  return await getCollection(MONGO_MANGADEX_CHAPTER_IMAGES);
};