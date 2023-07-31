import axios from 'axios'
import { useState,useEffect } from "react"
import { IPokemon } from "../interfaces/interfaces"

//por conveción se pone el use adelante del nombre del hook
export const usePokemon = (url: string, id?: string) => {
    const [pokemon, setPokemon] = useState<null | undefined | IPokemon>();

    const fetchPokemon = async () => {
        if (url) {
            const { data }: any = await axios.get(url);
            setPokemon(data);
        }else if(id){
            const { data }: any = await axios.get( `https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(data);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []); 

    return {pokemon}
}