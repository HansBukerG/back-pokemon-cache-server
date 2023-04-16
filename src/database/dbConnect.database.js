import { MongoClient } from 'mongodb';

const mongoConnectionScheme = process.env.MONGO_CONNECTION_SCHEME;
const mongoHost = process.env.MONGO_HOST;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDatabase = process.env.MONGO_DATABASE;

const mongoUri = `${mongoConnectionScheme}://${mongoUser}:${mongoPassword}@${mongoHost}/${mongoDatabase}`;

const mongoClient = new MongoClient(mongoUri);

export { mongoClient };