import mangadexApi from '../services/mangadex.api.js';
import mangadexCache from '../services/mangadex.cache.js';
import logger from '../utils/logger.utils.js';

const getManga = async (req, res) =>{
  try {
    logger.info('New request for: getManga');
    const {data} = await mangadexApi.getManga();

    return res.status(200).json({data});
  } catch (error) {
    logger.error(`getManga Controller failed on execution: ${error}`);
    return res.status(503).json({
      message:'Error on execution of Endpoint'
    });
  }
};

const getMangaById = async (req,res) =>{
  try {
    logger.info('New request for: getMangaById');
    const { titleId } = req.params;

    const { data } = await mangadexApi.getMangaById(titleId);
    return res.status(200).json({data});  
  } catch (error) {
    logger.error(`getMangaById Controller failed on execution: ${error}`);
    return res.status(503).json({
      message: 'Error on execution of Endpoint getMangaById'
    });
  }
};

const getMangaByTitle = async (req,res) =>{
  try {
    logger.info('New request for: getMangaByTitle');
    const { title } = req.params;

    const {data} = await mangadexApi.getMangaByTitle(title);

    return res.status(200).json({ data });
  } catch (error) {
    logger.error(`getMangaByTitle Controller failed on execution: ${error}`);
    return res.status(503).json({
      message: 'Error on execution of Endpoint'
    });
  }
};

const getChapters = async (req,res) =>{
  try {
    logger.info('New request for: getChapters');
    const { id } = req.params;
    const {data} = await mangadexApi.getChaptersByMangaId(id);
    return res.status(200).json({data});
  } catch (error) {
    logger.error(`getChapters Controller failed on execution: ${error}`);
    return res.status(503).json({
      message: 'Error on execution of Endpoint'
    });
  }
};

const getImagesOfChapterManga = async (req,res) => {
  try {
    logger.info('New request for: getImagesOfChapterManga');
    const { chapterId } = req.params;

    const chapterCache = await mangadexCache.getImagesByChapterId(chapterId);
    if(chapterCache){
      logger.info(`Cache data found for id: ${chapterId}`);
      return res.status(200).json(chapterCache);
    };
    
    logger.info(`No data in chache for id: ${chapterId}`);
    const chapterImages = await mangadexApi.getImagesOfChapter(chapterId);
    if (!chapterImages) {
      return res.status(404).json({message: 'Data not found'});
    }

    const dto = {
      id: chapterId,
      images: chapterImages,
    };
    await mangadexCache.insert(dto);
    logger.info(`Data stored for id: ${chapterId}`);
    return res.status(200).json(dto);

  } catch (error) {
    logger.error(`getImagesOfChapter Controller failed on execution: ${error}`);
    return res.status(503).json({
      message: 'Error on execution of Endpoint'
    });
  }
};

export default { 
  getManga, 
  getMangaByTitle,
  getChapters,
  getImagesOfChapterManga,
  getMangaById
};