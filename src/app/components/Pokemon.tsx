'use client'
import { fetchAllPokemon } from "@/services/pokemon";
import React, { Suspense , useState, useEffect } from "react";
import PokemonCard from "./cards/PokemonCard";
import { SimpleGrid } from "@chakra-ui/react";
import { PokemonData } from "@/types/types";
interface PokemonProps {
  region : string;
}
const Pokemon :React.FC<PokemonProps> =  ({region}) => {
  
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllPokemon(region);
        setPokemons(data);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, [region]); // useEffect will re-trigger whenever region changes
  return (
    <div>
      <SimpleGrid columns={4} spacing={10}>
        <Suspense fallback={<div>Loading pokemon...</div>}>
          {pokemons.map((pokemon: PokemonData) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id}/>
          ))}
        </Suspense>
      </SimpleGrid>
    </div>
  );
};

export default Pokemon;
