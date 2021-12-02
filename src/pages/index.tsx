import { GetStaticPropsContext } from 'next';
import Head from 'next/head';

import { api } from '../services/api';

import { PokemonCardData, RawPokemon } from '../interfaces/Pokemon';
import { PokemonList } from '../components/PokemonList';

import { Container } from '@chakra-ui/layout';

interface HomeProps {
  pokemons: PokemonCardData[];
}

const Home = ({ pokemons }: HomeProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Wendell Kenneddy" />
        <meta name="creator" content="Wendell Kenneddy" />
        <meta name="description" content="Uma Pokedex intuitiva." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="myPokedex" />
        <meta property="og:description" content="Uma Pokedex intuitiva." />
        <meta property="og:site_name" content="myPokedex" />
        <meta
          property="og:image"
          content="https://pokedexwk.vercel.app/apple-touch-icon.png"
        />
        <meta property="og:url" content="https://pokedexwk.vercel.app/" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="Uma Pokedex intuitiva." />
        <meta property="twitter:description" content="Uma Pokedex intuitiva." />
        <meta property="twitter:url" content="https://pokedexwk.vercel.app/" />
        <meta
          property="twitter:image"
          content="https://pokedexwk.vercel.app/logo192.png"
        />
        <title>myPokedex</title>
        <link rel="canonical" href="https://pokedexwk.vercel.app/" />
      </Head>

      <Container as="main" size="sm" marginBottom="4">
        <PokemonList pokemons={pokemons} />
      </Container>
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const pokemons: PokemonCardData[] = [];

  const randomStartIndex = Math.round(Math.random() * (500 - 1) + 1);

  // Collect data about 100 pokémons starting from the random index,
  // passing them as the props to the page
  for (let i = randomStartIndex; i < randomStartIndex + 100; i++) {
    const res = await api.get(`pokemon/${i}`);
    const data = res.data as RawPokemon;
    pokemons.push({
      name: data.name,
      sprite: data.sprites.front_default,
      id: data.id,
      types: data.types
    });
  }

  return {
    props: {
      pokemons
    },
    revalidate: 60 * 60 * 8 // 8 hours
  };
}

export default Home;
