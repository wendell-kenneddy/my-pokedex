import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import Head from 'next/head';

import { api } from '../../services/api';
import { PokemonCardData, RawPokemon } from '../../interfaces/Pokemon';

import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  VStack
} from '@chakra-ui/layout';

interface PokemonPageProps {
  pokemon: PokemonCardData;
}

interface PokedexResult {
  results: Array<{ name: string; url: string }>;
}

export default function Pokemon({ pokemon }: PokemonPageProps) {
  const bgColor = useColorModeValue('gray.500', 'gray.400');
  const typeCardColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Wendell Kenneddy" />
        <meta name="creator" content="Wendell Kenneddy" />
        <meta
          name="description"
          content={`Informações sobre ${pokemon.name}.`}
        />
        <meta property="og:title" content={`myPokedex | ${pokemon.name}`} />
        <meta
          property="og:description"
          content={`Informações sobre ${pokemon.name}.`}
        />
        <meta property="og:site_name" content={`myPokedex | ${pokemon.name}`} />
        <meta property="og:locale" content="pt_BR" />
        <meta
          property="twitter:title"
          content={`myPokedex | ${pokemon.name}.`}
        />
        <meta
          property="twitter:description"
          content={`Informações sobre ${pokemon.name}.`}
        />
        <title>myPokedex | {pokemon.name}</title>
      </Head>

      <Container
        backgroundColor={bgColor}
        borderRadius="lg"
        maxW="xs"
        padding="6"
      >
        <VStack spacing="6">
          <Flex align="center">
            <Heading as="h2" size="lg" marginRight="4">
              {pokemon.name}
            </Heading>

            <HStack>
              {pokemon.types.map((pokemonType) => {
                return (
                  <Box
                    key={pokemonType.slot}
                    bgColor={typeCardColor}
                    borderRadius="lg"
                    padding="2"
                  >
                    {pokemonType.type.name}
                  </Box>
                );
              })}
            </HStack>
          </Flex>

          <Box alignSelf="center">
            <Image
              src={pokemon.sprite}
              alt={`Sprite de ${pokemon.name}`}
              width="144"
              height="144"
            />
          </Box>
        </VStack>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=100';
    const res = await api.get<PokedexResult>(url);
    const pokedex = res.data;
    const paths = pokedex.results.map((result) => ({
      params: { name: result.name }
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const res = await api.get(`pokemon/${context.params?.name}`);
    const rawPokemon: RawPokemon = res.data;
    const pokemon: PokemonCardData = {
      name: rawPokemon.name,
      id: rawPokemon.id,
      sprite: rawPokemon.sprites.front_default,
      types: rawPokemon.types
    };

    return {
      props: {
        pokemon
      },
      revalidate: 30
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}
