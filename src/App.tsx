import './App.css'
import { useState } from 'react';
import PokeCard from './ui/PokeCard';
function App() {
  type Pokemon = {
    name: string;
    sprite: string;
    abilities: string;
  };
  const [pokemon,setPokemon] = useState<Pokemon | null>(null);
  const [shufflingPokemon,setShufflingPokemon] = useState<Pokemon | null>(null);
  const [isShuffling,setIsShuffling] = useState<boolean| false>(false);

  async function getRandomPokemon(){
    const id = Math.floor(Math.random() * 1010)  + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
  console.log(data);
    setPokemon({
      name: data.species.name,
      sprite: data.sprites.front_default,
      ability: data.abilities[0].ability.name
    });
    setIsShuffling(false);
    setShufflingPokemon(null);
  }

  function startShuffling(){
    setIsShuffling(true);
    let count = 0;

    const interval = setInterval(async () =>{
       const id = Math.floor(Math.random() * 1010)  + 1;
       try{
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await res.json();
          setShufflingPokemon({
            name: data.name,
            sprite: data.sprites.front_default,
            ability: data.abilities[0].ability.name,
          });
       } catch(error){
        console.error("u fucked up bud.",error);
       }

    count++;
    if (count > 10) {
      clearInterval(interval);
      getRandomPokemon();
    }
  }, 200);

  }
  return (
    <>
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-green-800">Welcome to the Pokémon Generator!</h1>
      <h2 className="py-2 text-3xl font-semibold text-green-800">Click to generate a random Pokémon</h2>
      <button className="px-6 py-2 bg-white text-green-700 font-bold rounded-lg mb-6 align-bottom hover:cursor-pointer" onClick={startShuffling}>Get Pokémon</button>
        {isShuffling && shufflingPokemon && (
           <div className="text-center">
               <h2 className="font-bold text-3xl">{` ${shufflingPokemon.name.charAt(0).toUpperCase() + shufflingPokemon.name.slice(1)}`}</h2>
              <img src={shufflingPokemon?.sprite} alt="Shuffling..." className="w-60 mx-auto animate-spin" />
              <p>Shuffling...</p>

            </div>
        )

        }
    
        
        { !isShuffling && pokemon &&(
          <PokeCard
            name={pokemon.name}
            sprite={pokemon.sprite}
            ability={pokemon.ability}
          />
        )}
    </div>
    </>
  )
}

export default App
