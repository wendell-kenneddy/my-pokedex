import type { AppProps } from 'next/app';

import { Navbar } from '../components/Navbar';
import { theme } from '../theme';

import { Box, ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />

      {/* Separator between the navbar and the content */}
      <Box marginBottom="28"></Box>

      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
