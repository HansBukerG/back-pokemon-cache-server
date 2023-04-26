import { Router } from 'express';
import mangaApiController from '../controller/mangaApi.controller.js';

const mangaRouter = new Router();

mangaRouter.get('/v1/manga', mangaApiController.getManga);
mangaRouter.get('/v1/manga/:title', mangaApiController.getMangaByTitle);
mangaRouter.get('/v1/manga/chapters/:id', mangaApiController.getChapters);
mangaRouter.get('/v1/chapter/images/:chapterId', mangaApiController.getImagesOfChapterManga);

export default mangaRouter;