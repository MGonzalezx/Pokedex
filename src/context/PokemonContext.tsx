import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { AllPokemonsResult, PokeType, PokemonsByTypeResult } from "../interfaces/types";

//agarra los valores que va a retornar nuestro context
interface ContextProps {
    types: PokeType[]
    filterSelected: PokeType
    pokemonsFiltered: string[] | null
    changeTypeSelected: (type: PokeType) => void
}

// al hacer createContext<ContextProps>({} as ContextProps) creamos un objeto con las propiedades de ContextProps

export const PokemonContext = createContext<ContextProps>({} as ContextProps)

const PokemonProvider = ({ children }: any) => {

    let allPokemonsUrl = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";

    const defaultState: PokeType = {
        name: "All",
        url: allPokemonsUrl,
    };

    const [allPokemons, setAllPokemons] = useState(null);
    const [pokemonsFiltered, setPokemonsFiltered] = useState(null);

    const [types, setTypes] = useState([defaultState]);
    const [filterSelected, setFilterSelected] = useState(defaultState);


    const changeTypeSelected = async (type: PokeType) => {
        setFilterSelected(type);
    
        // url! = siempre va a ver una url
        const { data } = await axios.get(type?.url!);
        let pokemons = data?.pokemon?.map(
          ({ pokemon }: PokemonsByTypeResult) => pokemon?.url
        );
    
        type.name !== "All"
          ? setPokemonsFiltered(pokemons) // si el type es alguno de los tipos, filtramos a todos los pokemon de tal tipo
          : setPokemonsFiltered(allPokemons); //si es ALL, filtramos a todos los pokemones de todos los tipos
      };


    const getPokemonsType = async () => {
        const { data } = await axios.get("https://pokeapi.co/api/v2/type");
        setTypes([...types, ...data.results]);
      };

    //Creamos función para traer a todos los pokemons
    const getAllPokemons = async () => {

        //desestructurar data de la petición  await axios.get(allPokemonsUrl)
        const { data } = await axios.get(allPokemonsUrl);


        let pokemons = data?.results?.map(
            (pokemon: AllPokemonsResult) => pokemon?.url
        );
        
        setAllPokemons(pokemons);
        setPokemonsFiltered(pokemons);
    };


    useEffect(() => {
        getPokemonsType();
        getAllPokemons();
    }, []);

    return (
        <PokemonContext.Provider
            value={{
                types,
                filterSelected,
                pokemonsFiltered,
                changeTypeSelected,
            }}>
            {children}
        </PokemonContext.Provider>
    )
}


export default PokemonProvider