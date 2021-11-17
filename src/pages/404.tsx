import Head from 'next/head';

import { Container, Heading } from '@chakra-ui/layout';

export default function pageNotFound() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Wendell Kenneddy" />
        <meta name="creator" content="Wendell Kenneddy" />
        <meta name="description" content="Error occurred." />
        <title>myPokedex | Erro</title>
      </Head>

      <Container maxW={['xs', 'md']}>
        <Heading as="h2" size="lg">
          Página não encontrada :(
        </Heading>
      </Container>
    </>
  );
}
