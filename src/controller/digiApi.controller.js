import 'dotenv/config.js';
import apiUriService from '../services/apiUri.service.js';
import digiApiService from '../services/digiApi.service.js';

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

const getByName = async (req,res) => {
  try {
    const name = req.params.name;
    const arrayOfNames = name.split(' ');

    const promiseAll = arrayOfNames.map(async (digiName) =>
    {
      const checkData = await digiApiService.getDigimon(digiName);
      if (checkData !== null)
      {
        return checkData;
      }
      console.log(`data has not found in database! with parameter: ${digiName}`);
      const digimonData = await apiUriService.getDigimonInfo(digiName);
      if (digimonData !== undefined)
      {
        await digiApiService.insert(digimonData);
        return digimonData;
      }
      console.log(`Not data found: ${digiName}`);
    });

    const arrayOfDigimons = (await Promise.all(promiseAll)).filter(Boolean);

    res.status(200).json({
      message: `A bunch of digimons has been added to your digidex(?)! ${name}`,
      digimons: arrayOfDigimons
    }
    );
  } catch (error) {
    res.status(502).json({message:`Bad gateway error: ${error}`});
  }
};

export default { getAll, getByName };