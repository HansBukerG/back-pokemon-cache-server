import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import pokeRouter from './routes/routes.pokemon.js';
import digiRouter from './routes/routes.digimon.js';
import mangaRouter from './routes/mangadex.router.js';

const app = () => {
  try {
    const app = express();
    app.use(cors());
    app.use(pokeRouter);
    app.use(digiRouter);
    app.use(mangaRouter);
    const port = process.env.PORT || 3001;
    app.listen(port, () => console.log(`Rest ready to listen in port: ${port}`));
  } catch (error) {
    console.error(`app failed to start: ${error}`);
  }

};

export default app;