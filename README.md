# back-pokemon-cache-server

Esta API te permite acceder a información sobre los Pokemons y Digimons de varias regiones. Los datos son obtenidos de dos servicios web: PokeAPI y DigiAPI.

Endpoints:

--------------------------------------------

    /pokeApi/get/
    
    Obtiene la lista completa de Pokemons que se encuentran en la Pokedex.

    Ejemplo de uso:

    GET /pokeApi/get/

--------------------------------------------

    /pokeApi/get/:name
    
    Obtiene información sobre un Pokemon específico que se encuentre en la  Pokedex. El parámetro :name es el nombre del Pokemon que se desea buscar.

    Ejemplo de uso:

    GET /pokeApi/get/pikachu


--------------------------------------------

    /digiApi/get/ 

    Obtiene la lista completa de Digimons que se encuentran en la Digidex.

    Ejemplo de uso:

    GET /digiApi/get/

--------------------------------------------

    /digiApi/get/:name 

    Obtiene información sobre un Digimon específico que se encuentre en la Digidex. El parámetro :name es el nombre del Digimon que se desea buscar.

    Ejemplo de uso:

    GET /digiApi/get/agumon

--------------------------------------------

# Licencia

Esta aplicación está realizada por Hans Buker Gutiérrez, tiene como objetivo principal la adquisición de aprendeizaje en el uso de nuevas tecnologías.