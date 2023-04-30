import axios from 'axios';
import { DIGIAPI_URI, POKEAPI_URI } from '../../environments/environment.js';
import logger from '../utils/logger.utils.js';

const getPokemonInfo = async (nameOrId) =>
{
  try
  {
    const URI = `${POKEAPI_URI}/api/v2/pokemon/${nameOrId}`;
    const response = await axios.get(URI);
    const { id, name, moves, sprites } = response.data;
    return { id ,name, moves, sprites };
  }
  catch (error)
  {
    if (error.response && error.response.status === 404)
    {
      return undefined;
    }
    console.error(error);
    return undefined;
  }
};

const getDigimonInfo = async (nameOrId) =>
{
  try
  {
    const URI = `${DIGIAPI_URI}/api/v1/digimon/${nameOrId}`;
    const response = await axios.get(URI);
    const { id, name, skills, images } = response.data;
    return { id, name, skills, images };
  }
  catch (error)
  {
    if (error.response.data.error === 1)
    {
      return undefined;
    }
    console.error(error);
    return undefined;
  }
};



export default { getPokemonInfo, getDigimonInfo };
