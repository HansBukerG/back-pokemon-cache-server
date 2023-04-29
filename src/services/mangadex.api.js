import axios from 'axios';
import { MANGADEX_URI, MANGADEX_LIMIT, MANGADEX_DATASOURCE} from '../../environments/environment.js';

const getCoverArt = async (coverArtId) =>
{
  // Esta api trae la imagen de portada en base a la id del manga
  // https://api.mangadex.org/cover
  try
  {
    const URI = `${MANGADEX_URI}/cover/${coverArtId}`;
    const { data } = await axios.get(URI);
    return data;
  } catch (error)
  {
    console.error(error);
    return undefined;
  }
};

const getManga = async () =>{
  try {
    const URI = `${MANGADEX_URI}/manga?limit=${MANGADEX_LIMIT}&includes[]=cover_art`;
    const { data } = await axios.get(URI);
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getMangaByTitle = async (title) =>
{
  try
  {
    const baseUrl = `${MANGADEX_URI}/manga`;
    const { data } = await axios.get(baseUrl, {
      params: {
        title,
        includes: ['cover_art'],
      },
    });
    return data;
  } catch (error)
  {
    console.error(error);
    return undefined;
  }
};

const getChaptersByMangaId = async (mangaID) =>
{
  try
  {
    const baseUrl = `${MANGADEX_URI}/manga/${mangaID}/feed`;
    const { data } = await axios.get(baseUrl);
    return data;
  } catch (error)
  {
    console.error(error);
    return undefined;
  }
};

const getImagesOfChapter = async (chapterId) => {
  try {
    const baseUrl = `${MANGADEX_URI}/at-home/server/${chapterId}`;
    console.log(`retrieving data from: ${baseUrl}`);
    const { data } = await axios.get(baseUrl);
    if (!data) {
      throw error(`There is not data found on execution of API: ${baseUrl}`);
      return undefined;
    }
    const images = [];
    data.chapter.data.map((image) =>
    {
      const imageUrl = `${data.baseUrl}/data/${data.chapter.hash}/${image}`;
      images.push(imageUrl);
      return imageUrl;
    });
    return images;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default { 
  getChaptersByMangaId, 
  getManga, 
  getMangaByTitle, 
  getImagesOfChapter 
};