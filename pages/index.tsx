import { GetStaticProps } from 'next'
import { Layout } from '@/components/layouts'

import React from 'react'
import { NextPage } from 'next'
import { pokeApi } from '@/api'
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '@/components/pokemon'

interface Props {
  pokemons: SmallPokemon[]
}

export const HomePage: NextPage<Props> = ({ pokemons }) => {


  return (
    <Layout>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
        {pokemons.map((pokemon: SmallPokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(ctx)
  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  const pokemons: SmallPokemon[] = data.results.map((pokemon: SmallPokemon, index: number) => {
    const id = index + 1
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    return {
      ...pokemon,
      id,
      image
    }
  })

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage


