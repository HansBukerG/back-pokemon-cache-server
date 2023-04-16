import 'dotenv/config.js';
import getPokemonInfo from '../services/API.service.js';

const getAll = async (req,res) => {
  try {
    const pokemonData = await getPokemonInfo('ditto');
    res.status(200).json({
      message: 'A pokemon has benn found!',
      pokemonData
    }
    );
  } catch (error) {
    res.status(502).json({message:`Bad gateway error: ${error}`});
  }
};

export default { getAll };