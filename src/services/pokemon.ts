import { PokemonData } from "@/types/types";

interface Region {
  start : number;
  end : number;
}
export const regionRanges = {
    kanto: { start: 1, end: 151 },
    johto: { start: 152, end: 251 },
    hoenn: { start: 252, end: 386 },
    sinnoh : {start : 387, end : 493},
    unnova : {start : 494, end : 649},
    kalos : {start : 650 , end : 721 },
    alola : {start : 722, end : 809 },
    galar : {start : 810, end : 905 },
    paldea : {start : 906, end : 1025 }

    // Add more regions as needed
  };

export const fetchAllPokemon = async (region: string): Promise<PokemonData[]> => {


  
  const { start, end } = (regionRanges as Record<string, Region>)[region] || { start: 0, end: 0 };


  const pokemonPromises: Promise<PokemonData>[] = [];
  for (let a = start; a <= end; a++) {
    const pokemonByRegion = fetch(`https://pokeapi.co/api/v2/pokemon/${a}`)
      .then(res => res.json())
      .then((data: PokemonData) => {
        return data; 
      })
    pokemonPromises.push(pokemonByRegion);
  }

  const pokemon: PokemonData[] = await Promise.all(pokemonPromises);

 return pokemon;
};
