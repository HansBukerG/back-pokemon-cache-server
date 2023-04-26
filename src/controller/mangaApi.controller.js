import { json } from 'express';
import mangadexApi from '../services/mangadex.api.js';
import mangadexCache from '../services/mangadex.cache.js';


const getManga = async (req, res) =>{
  try {
    const mangaFound = await mangadexApi.getManga();

    return res.status(200).json(
      {
        message:'Data collected succesfully!',
        data: mangaFound.data,
      }
    );
  } catch (error) {
    console.error(`getManga Controller failed on execution: ${error}`);
    return res.status(503).json({
      message:'Error on execution of Endpoint'
    });
  }
};

const getMangaByTitle = async (req,res) =>{
  try {
    const { title } = req.params;

    const mangaFound = await mangadexApi.getMangaByTitle(title);

    return res.status(200).json({
      message:'Controller executed succesfully!',
      data: mangaFound.data,
    });
  } catch (error) {
    console.error(`getMangaByTitle Controller failed on execution: ${error}`);
    return res.status(503).json({
      message: 'Error on execution of Endpoint'
    });
  }
};

const getChapters = async (req,res) =>{
  try {
    const { id } = req.params;
    const mangaChapters = await mangadexApi.getChaptersByMangaId(id);
    return res.status(200).json({
      message:'data found succesfully!',
      data: mangaChapters.data,
    });
  } catch (error) {
    console.error(`getChapters Controller failed on execution: ${error}`);
    return res.status(503).json({
      message: 'Error on execution of Endpoint'
    });
  }
};

const getImagesOfChapterManga = async (req,res) => {
  try {
    console.log('new Request for getImagesOfChapterManga controller');
    const { chapterId } = req.params;

    const chapterCache = await mangadexCache.getImagesByChapterId(chapterId);
    if(chapterCache){
      console.log(`Cache data found for id: ${chapterId}`);
      return res.status(200).json(chapterCache);
    };
    
    const chapterImages = await mangadexApi.getImagesOfChapter(chapterId);
    if (!chapterImages) {
      return res.status(404).json({message: 'Data not found'});
    }

    const dto = {
      id: chapterId,
      images: chapterImages,
    };

    const savedData = await mangadexCache.insert(dto);
    console.log(`Data stored for id: ${chapterId}`);
    return res.status(200).json(dto);

  } catch (error) {
    console.error(`getImagesOfChapter Controller failed on execution: ${error}`);
    return res.status(503).json({
      message: 'Error on execution of Endpoint'
    });
  }
};

export default { 
  getManga, 
  getMangaByTitle,
  getChapters,
  getImagesOfChapterManga 
};