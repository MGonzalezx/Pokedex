import { PokeTypes } from "../utils/BackgroundsByType";

export type PokeType = {
    name: PokeTypes | "All"; //name que va a ser un PokeTypes O ALL
    url?: string;  // una url opcional que va a ser un string
  };

  export type AllPokemonsResult = {
    name: string;
    url: string;
  };

  export type PokemonsByTypeResult = {
    pokemon: {
      name: string;
      url: string;
    };
  };