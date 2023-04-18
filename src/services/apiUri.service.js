import axios from 'axios';

const getPokemonInfo = async (nameOrId) =>
{
  try
  {
    const URI = `${process.env.POKEAPI_URI}/api/v2/pokemon/${nameOrId}`;
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

export default {getPokemonInfo};
