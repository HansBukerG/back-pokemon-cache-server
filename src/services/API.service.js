import axios from 'axios';

const getPokemonInfo = async (nameOrId) =>
{
  try
  {
    const URI = `${process.env.API_URI}/api/v2/pokemon/${nameOrId}`;
    const response = await axios.get(URI);
    const { name, moves, sprites } = response.data;

    return { name, moves, sprites };
  }
  catch (error)
  {
    console.error(error);
  }
};

export default getPokemonInfo;
