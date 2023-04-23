import 'dotenv/config.js';
import apiUriService from '../services/apiUri.service.js';
import pokeApiService from '../services/pokeApi.Service.js';

const getAll = async (req,res) => {
  try {
    const pokemonData = await pokeApiService.getAll();
    res.status(200).json({
      message: 'This is the list of pokemons found in your pokedex',
      pokemonData
    }
    );
  } catch (error) {
    res.status(502).json({message:`Bad gateway error: ${error}`});
  }
};

const getPokemonsByName = async (req, res) =>
{
  try
  {
    const { name } = req.params;
    const pokemonNamesArray = name.split(' ');

    const promisesArray = pokemonNamesArray.map(async (pokemonName) =>
    {
      pokemonName = pokemonName.replace('-', ' ');
      const existingPokemon = await pokeApiService.getPokemon(pokemonName);
      if (existingPokemon)
      {
        return existingPokemon;
      }
      const pokemonData = await apiUriService.getPokemonInfo(pokemonName);
      if (pokemonData)
      {
        await pokeApiService.insert(pokemonData);
        return pokemonData;
      }
      console.log(`No data found for: ${pokemonName}`);
    });

    const pokemonsResultArray = (await Promise.all(promisesArray)).filter(Boolean);

    res.status(200).json({
      message: `A group of Pokemons has been added to your Pokedex! Names: ${name}`,
      pokemons: pokemonsResultArray,
    });
  } catch (error)
  {
    res.status(502).json({ message: `Bad gateway error: ${error}` });
  }
};


export default { getAll, getPokemonsByName };