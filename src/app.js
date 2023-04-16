import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import pokeRouter from './routes/routes.js';

const app = () => {
  const app = express();
  console.log('app init');
  app.use(cors());
  app.use(pokeRouter);
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Rest ready to listen in port: ${port}`));
};

export default app;