
interface PokemonProps{
    name: string;
    sprite: string;
    ability: string;
}

export default function PokeCard({ name, sprite, ability }: PokemonProps){
    return(
        <div>
            <h2 className="font-bold text-3xl">{`You got ${name.charAt(0).toUpperCase() + name.slice(1)}!`}</h2>
            <img src={sprite}
                alt={name}
                className="w-60 h-60 mx-auto animate-bounce"/>
            <h2>{`${name.charAt(0).toUpperCase() + name.slice(1)}'s main ability is: ${ability.charAt(0).toUpperCase() + ability.slice(1)}!`}</h2>
            <a href={`https://pokemon.fandom.com/wiki/${name.charAt(0).toUpperCase() + name.slice(1)}`}>{`Click here to learn more about ${name.charAt(0).toUpperCase() +name.slice(1)}`}</a>
        </div>
    )

}