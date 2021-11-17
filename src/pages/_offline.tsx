import Head from 'next/head';

import { Container, Heading } from '@chakra-ui/layout';

export default function Offline() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Wendell Kenneddy" />
        <meta name="creator" content="Wendell Kenneddy" />
        <meta name="description" content="Error occurred." />
        <title>myPokedex | Offline</title>
      </Head>

      <Container maxW={['xs', 'md']}>
        <Heading as="h2" size="lg">
          Offline no momento :(
        </Heading>
      </Container>
    </>
  );
}
