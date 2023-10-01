import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { pokeApi } from '@/api'
import { Pokemon, PokemonListResponse } from '@/interfaces'
import { PokemonDetail } from '@/components/pokemon'
import { getPokemonInfoBy } from '@/lib/utils'

interface Props {
    pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
    return (<PokemonDetail pokemon={pokemon} />)
}

export const getStaticPaths: GetStaticPaths<any> = async (ctx: any) => {
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
    const names = data.results.map((res) => res.name)

    return {
        paths: names.map(name => ({ params: { name } })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const { name } = ctx.params as { name: string }
    return {
        props: await getPokemonInfoBy(name)
    }
}

export default PokemonByNamePage