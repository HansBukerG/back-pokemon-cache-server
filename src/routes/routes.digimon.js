import digiApiController from '../controller/digiApi.controller.js';
import { Router } from 'express';

const digiRouter = new Router();

digiRouter.get('/digiApi/get/', digiApiController.getAll);
digiRouter.get('/digiApi/get/:name', digiApiController.getDigimonsByName);

export default digiRouter;