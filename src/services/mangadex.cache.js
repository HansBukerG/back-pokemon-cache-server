import { getMangaChapterCollection } from '../database/dbConnect.database.js';

const insert = async (data) =>
{
  try
  {
    const collection = await getMangaChapterCollection();
    const result = await collection.insertOne(data);
    return result;
  } catch (error)
  {
    console.error(error);
    return undefined;
  }
};

const getImagesByChapterId = async (chapterId) =>
{
  try {
    const collection = await getMangaChapterCollection();
    const result = await collection.findOne({ id: chapterId });
    if (!result)
    {
      return null;
    }
    return result;
  } catch (error) {
    console.error(`getImagesByChapterId() error: ${error}`);
  }

};

export default { getImagesByChapterId, insert };