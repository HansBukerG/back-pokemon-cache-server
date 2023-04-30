import apiUriService from '../services/apiUri.service.js';
import digiApiService from '../services/digiApiCollection.service.js';
import logger from '../utils/logger.utils.js';

const getAll = async (req,res) => {
  try {
    const digimonData = await digiApiService.getAll();
    res.status(200).json({
      message: 'This is the list of pokemons found in your digidex(?)',
      digimonData
    }
    );
  } catch (error) {
    res.status(502).json({message:`Bad gateway error: ${error}`});
  }
};

const getDigimonsByName = async (req,res) => {
  try
  {
    const { name } = req.params;
    const digimonNamesArray = name.split(' ');

    const promisesArray = digimonNamesArray.map(async (digimonName) =>
    {
      try
      {
        digimonName = digimonName.replace('-', ' ');
        const existingDigimon = await digiApiService.getDigimon(digimonName);
        if (existingDigimon)
        {
          return existingDigimon;
        }
        const digimonData = await apiUriService.getDigimonInfo(digimonName);
        if (digimonData)
        {
          await digiApiService.insert(digimonData);
          console.log(`Added a new digimon to your database!: ${digimonData.name}`);
          return digimonData;
        }
        console.log(`No data found for: ${digimonName}`);
      } catch (error)
      {
        logger.error(`An error occurred: ${error}`);
      }
    });

    const digimonsResultArray = (await Promise.all(promisesArray)).filter(Boolean);

    res.status(200).json({
      message: `A group of Digimons has been added to your Digidex! Names: ${name}`,
      digimons: digimonsResultArray,
    });
  } catch (error)
  {
    res.status(502).json({ message: `Bad gateway error: ${error}` });
  }
};

export default { getAll, getDigimonsByName };