import Link from 'next/link';

import { PokemonCardData } from '../../interfaces/Pokemon';

import { PokemonCard } from '../PokemonCard';

import { Grid } from '@chakra-ui/layout';

interface PokemonListProps {
  pokemons: PokemonCardData[];
}

export function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <Grid
      templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)']}
      gap="4"
      as="ul"
      listStyleType="none"
    >
      {pokemons.map((pokemon) => (
        <Link passHref href={`/pokemon/${pokemon.name}`} key={pokemon.id}>
          <a>
            <PokemonCard pokemon={pokemon} />
          </a>
        </Link>
      ))}
    </Grid>
  );
}
