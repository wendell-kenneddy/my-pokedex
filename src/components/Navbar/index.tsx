import { FormEvent, useState } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { FaMoon, FaSearch, FaSun } from 'react-icons/fa';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { Flex } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { Input } from '@chakra-ui/input';
import { useDisclosure } from '@chakra-ui/hooks';
import { useToast } from '@chakra-ui/toast';

export function Navbar() {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonName, setPokemonName] = useState('');
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const toast = useToast();

  function searchPokemon(e: FormEvent) {
    setIsLoading(true);
    e.preventDefault();

    const toastId = 'error-toast';

    if (!pokemonName.trim()) {
      if (toast.isActive(toastId)) {
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      return toast({
        id: toastId,
        title: 'Nome necessário.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    }

    setPokemonName('');
    router.push(`/pokemon/${pokemonName.toLowerCase()}`);
    setIsLoading(false);
    onClose();
    return;
  }

  return (
    <>
      <Flex
        as="header"
        width="full"
        height="20"
        backgroundColor={useColorModeValue('red.600', 'red.400')}
        p="2"
        align="center"
        justify="space-between"
        shadow="lg"
        position="fixed"
        top="0"
        zIndex="banner"
      >
        <Link href="/" passHref>
          <a>
            <Image
              src="https://fontmeme.com/permalink/211111/e34eaff76fc394d66bc8afb36d8cc8f9.png"
              alt="Logo"
              width="152"
              height="64"
            />
          </a>
        </Link>

        <ButtonGroup>
          <Tooltip label="Pesquisar Pokémon" hasArrow>
            <Button
              variant="solid"
              colorScheme="red"
              size="sm"
              onClick={onOpen}
            >
              <FaSearch size="24" color="white" />
            </Button>
          </Tooltip>

          <Tooltip label="Mudar Tema" hasArrow placement="left">
            <Button
              variant="solid"
              colorScheme="red"
              onClick={toggleColorMode}
              size="sm"
            >
              {colorMode === 'light' ? (
                <FaMoon size="24" color="white" />
              ) : (
                <FaSun size="24" color="white" />
              )}
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Pesquisar Pokémon</DrawerHeader>

          <DrawerBody>
            <form id="pokemon-form" onSubmit={searchPokemon} autoComplete="off">
              <Input
                placeholder="Nome do Pokémon"
                name="pokemon-name"
                onChange={(e) => setPokemonName(e.target.value)}
                value={pokemonName}
              />
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              name="Cancel button"
            >
              Cancelar
            </Button>

            <Button
              colorScheme="red"
              type="submit"
              form="pokemon-form"
              isLoading={isLoading}
              name="Search button"
            >
              Pesqusiar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
