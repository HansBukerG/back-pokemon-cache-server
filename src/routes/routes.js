import pokeapiController from '../controller/pokeapi.controller.js';
import { Router } from 'express';

const pokeRouter = new Router();

pokeRouter.get('/pokeApi/get/', pokeapiController.getAll);

export default pokeRouter;