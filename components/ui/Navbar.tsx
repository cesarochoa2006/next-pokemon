import React from 'react'
import Link from 'next/link'
import { Button } from '.'
import Image from 'next/image'

export const Navbar = () => {

    return (
        <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 min-w-full border-b bg-background/60 backdrop-blur">
            <div className="container flex items-center justify-start h-16 mx-1 min-w-full">
                <Link href="/" className="flex items-center justify-start">
                    <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg"
                        alt="pokeball" width={50} height={50} />
                    <h1 className="text-2xl font-bold text-white ml-4">P</h1>
                    <h2>okémon</h2>
                </Link>
                <span className="flex-1"></span>
                <Link href="/favorites"><Button variant="link">Favoritos</Button></Link>
            </div>
        </header>
    )
}
