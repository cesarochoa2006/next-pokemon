import { FC } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, Button } from "../ui"
import { SmallPokemon } from '@/interfaces'
import { useRouter } from 'next/router'

interface PokemonCardProps {
    pokemon: SmallPokemon
}


export const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {

    const router = useRouter()
    const onClick = () => {
        router.push(`/name/${pokemon.name}`)
    }

    return <Card className='flex flex-col items-center bg-slate-900 '>
        <CardContent className='flex flex-col items-center content-center p-5 w-full'>
            <Image className="relative h-32 w-auto" src={pokemon.image} alt={pokemon.name} sizes="150px" width={150} height={150} />
        </CardContent>
        <CardFooter className='w-full flex flex-col items-center'>
            <span className="text-lg font-semibold text-center capitalize">#{pokemon.id} {pokemon.name}</span>
            <Button className="mt-2 w-full hover:bg-primary" variant="secondary" onClick={onClick}>Ver</Button>
        </CardFooter>
    </Card>
}
