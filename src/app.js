import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import pokeRouter from './routes/routes.pokemon.js';
import digiRouter from './routes/routes.digimon.js';
import mangaRouter from './routes/mangadex.router.js';
import { PORT } from '../environments/environment.js';
import logger from './utils/logger.utils.js';

const app = () => {
  try {
    const app = express();
    app.use(cors());
    app.use(pokeRouter);
    app.use(digiRouter);
    app.use(mangaRouter);
    const port = PORT || 3001;
    app.listen(port, () => logger.info(`Rest ready to listen in port: ${port}`));
  } catch (error) {
    logger.error(`app failed to start: ${error}`);
  }

};

export default app;