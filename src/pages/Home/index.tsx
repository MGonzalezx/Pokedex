import { useContext } from "react"
import { PokeballIconSmall } from "../../assets/pokeball"
import { PokemonContext } from "../../context/PokemonContext"
import { PokemonList } from "../../components/PokemonList"
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../../components/Pagination";
import { Filters } from "../../components/Filters";

import styles from './styles.module.scss'


export const Home = () => {

    const { pokemonsFiltered } = useContext(PokemonContext)
    const { page, nextPage, previousPage, backToHome } = usePagination();

    let perPage = 12;


    return (
        <div className={styles.home}>
            <header>
                <div onClick={backToHome}>
                    <PokeballIconSmall />
                    <span>Pokedex</span>
                </div>
            </header>
            <Filters />
            <PokemonList
                page={page}
                perPage={perPage}
                pokemonsUrls={pokemonsFiltered} />
            <Pagination
                page={page}
                perPage={perPage}
                nextPage={nextPage}
                previousPage={previousPage}
                maxItems={pokemonsFiltered?.length!}
            />
        </div>
    )
}
