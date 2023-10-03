import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { Pokemon } from '@/interfaces'
import { PokemonDetail } from '@/components/pokemon'
import { getPokemonInfoBy } from '@/lib/utils'

interface Props {
    pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    return (<PokemonDetail pokemon={pokemon} />)
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths<any> = async (ctx) => {
    //const { data } = await  // your fetch function here 
    const pokemons151 = [...Array(151)].map((_, i) => ({
        params: { id: `${i + 1}` }
    }))

    return {
        paths: pokemons151,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const { id } = ctx.params as { id: string }
    const pokemonInfo = await getPokemonInfoBy(id)
    if (!pokemonInfo) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: pokemonInfo,
        revalidate: 86400
    }

}

export default PokemonPage