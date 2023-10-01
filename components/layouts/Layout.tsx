import Head from 'next/head'
import React, { ReactNode } from 'react'
import { Navbar } from '../ui'

interface LayoutProps {
    title?: string
    children: ReactNode
}

const origin = typeof window !== 'undefined' ? window.location.origin : ''

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title ?? 'Pokemon app'}</title>
                <meta name="description" content={`Información sobre el pokémon ${title}`} />
                <meta name="author" content="Cesar Ochoa" />
                <meta name="keywords" content={`pokemon, nextjs, react ${title}`} />
                <meta property="og:title" content={`Información sobre el pokémon ${title}`} />
                <meta property="og:description" content="Algunos detalles sobre tus pokémon favoritos" />
                <meta property="og:image" content={`${origin}/pokemon.png`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <main className='container m-auto'>
                {children}
            </main>
        </>
    )
}
