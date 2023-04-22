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

const getByName = async (req,res) => {
  try {
    const name = req.params.name;
    const arrayOfNames = name.split(' ');

    const promiseAll = arrayOfNames.map(async (pokeName) =>
    {
      pokeName = pokeName.replace('-', ' ');
      const checkData = await pokeApiService.getPokemon(pokeName);
      if (checkData !== null)
      {
        return checkData;
      }
      const pokemonData = await apiUriService.getPokemonInfo(pokeName);
      if (pokemonData !== undefined)
      {
        await pokeApiService.insert(pokemonData);
        return pokemonData;
      }
      console.log(`Not data found: ${pokeName}`);
    });

    const arrayOfPokemons = (await Promise.all(promiseAll)).filter(Boolean);

    res.status(200).json({
      message: `A bunch of pokemons has been added to your pokedex! ${name}`,
      pokemons: arrayOfPokemons
    }
    );
  } catch (error) {
    res.status(502).json({message:`Bad gateway error: ${error}`});
  }
};

export default { getAll, getByName };