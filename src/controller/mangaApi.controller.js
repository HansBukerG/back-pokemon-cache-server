import { json } from 'express';
import mangadexApi from '../services/mangadex.api.js';


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
    const { chapterId } = req.params;
    const chapterImages = await mangadexApi.getImagesOfChapter(chapterId);
    return res.status(200).json({
      message: 'chapter retrieved succesfully',
      chapter: chapterImages,
    });
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