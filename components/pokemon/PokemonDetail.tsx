import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import { Switch, Label } from "@/components/ui/"

import { Pokemon } from '@/interfaces'
import { Card, CardContent, CardHeader } from '@/components/ui'
import { Layout } from '@/components/layouts'
import { isFavoritePokemon, toogleFavoritePokemon } from '@/lib/utils'

interface Props {
    pokemon: Pokemon
}

export const PokemonDetail: NextPage<Props> = ({ pokemon }) => {
    const [favorite, setFavorite] = useState(false)
    useEffect(() => {
        isFavoritePokemon(pokemon.id, setFavorite)
    }, [pokemon.id])

    const toggleFavorite = () => {
        toogleFavoritePokemon(pokemon.id, setFavorite)
    }
    return (
        <Layout title={pokemon.name}>
            <div className="grid container py-10 sm:grid-cols-1 md:grid-cols-3 gap-4 ">
                <Card className='md:col-span-1 bg-slate-900'>
                    <CardContent className='flex flex-col items-center content-center p-5 w-full'>
                        <Image className="relative h-64 w-auto"
                            src={pokemon.sprites.other?.dream_world.front_default || 'no-image'}
                            alt={pokemon.name} sizes="100px" width={100} height={100} />
                    </CardContent>
                </Card>

                <Card className='md:col-span-2 bg-slate-900'>
                    <CardHeader className='flex sm:flex-col md:flex-row justify-around items-center'>
                        <h1 className='uppercase text-xl'>{pokemon.name}</h1>
                        <span className='flex-1'></span>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="addFavorite">Agregar a favoritos</Label>
                            <Switch
                                id="addFavorite"
                                checked={favorite}
                                onCheckedChange={toggleFavorite}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-4'>
                        <h1 className='uppercase text-lg w-full'>Sprites:</h1>
                        <div className='grid gap-0 justify-items-center sm:grid-cols-2 md:grid-cols-4 '>
                            <Image
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name} width={100} height={100} />
                            <Image
                                src={pokemon.sprites.back_default}
                                alt={pokemon.name} width={100} height={100} />
                            <Image
                                src={pokemon.sprites.front_shiny}
                                alt={pokemon.name} width={100} height={100} />
                            <Image
                                src={pokemon.sprites.back_shiny}
                                alt={pokemon.name} width={100} height={100} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    )
}

