import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import NProgress from 'nprogress';
import '../../public/nprogress.css';

import { Navbar } from '../components/Navbar';
import { theme } from '../theme';

import { Box, ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', NProgress.start);
    router.events.on('routeChangeComplete', NProgress.done);
    router.events.on('routeChangeError', NProgress.done);

    return () => {
      router.events.off('routeChangeStart', NProgress.start);
      router.events.off('routeChangeComplete', NProgress.done);
      router.events.off('routeChangeError', NProgress.done);
    };
  }, [router.events]);

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
