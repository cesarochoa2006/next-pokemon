import { useEffect, useState } from 'react'
import { Layout } from '@/components/layouts'
import { getFavorites } from '@/lib/utils'
import Image from 'next/image'
import { Pokemon, SmallPokemon } from '@/interfaces'
import { pokeApi } from '@/api'
import { PokemonCard } from '@/components/pokemon'
import { Skeleton } from '@/components/ui'

const loadFavorites = async (id: number) => {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`)
    return {
        id: data.id,
        url: '',
        name: data.name,
        image: data.sprites.other?.dream_world.front_default || 'no-image'
    }
}

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<SmallPokemon[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        async function load() {
            const currentFavorites = getFavorites()
            const promises = currentFavorites.map((id) => loadFavorites(id))
            setFavorites(await Promise.all(promises))
            setLoading(false)
        }
        load()
    }, [])

    return (
        <Layout title="Favoritos">
            <div className='container p-5'>
                <h1 className='text-2xl font-bold'>Favoritos</h1>
                {loading && <Skeleton className='flex flex-col justify-items-center items-center gap-4 py-20'></Skeleton>}
                {
                    !loading && favorites.length === 0 && (<div className='flex flex-col justify-items-center items-center gap-4 py-20'>
                        <h3>No tienes favoritos aún</h3>
                        <Image className="relative h-32 w-auto opacity-10"
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                            alt="pokemon-shadow" sizes="300px" width={300} height={300} />
                    </div>)
                }
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                    {!loading && favorites.map((id) => (<PokemonCard key={id.id} pokemon={id} />))}
                </div>
            </div>
        </Layout>
    )
}

export default FavoritesPage