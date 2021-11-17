import Image from 'next/image';

import { Box, Text } from '@chakra-ui/layout';
import { PokemonCardData } from '../../interfaces/Pokemon';

import { useColorModeValue } from '@chakra-ui/color-mode';

interface PokemonCardProps {
  pokemon: PokemonCardData;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Box
      as="li"
      listStyleType="none"
      borderRadius="md"
      width="32"
      display="flex"
      flexDirection="column"
      alignItems="center"
      boxShadow="sm"
      backgroundColor={useColorModeValue('gray.400', 'gray.700')}
      w="100%"
    >
      <Image
        src={pokemon.sprite}
        alt={`Sprite de ${pokemon.name}`}
        width="96"
        height="96"
      />
      <Text as="span" marginTop="4">
        {pokemon.name}
      </Text>
    </Box>
  );
}
