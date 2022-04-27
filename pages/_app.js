import { ChakraProvider } from '@chakra-ui/react';
import { MainProvider } from '../context/MainContext';
import { UsersProvider } from '../context/UsersContext';
import { SocketProvider } from '../context/SocketContext';

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <MainProvider>
        <UsersProvider>
          <SocketProvider>
            <Component {...pageProps} />
          </SocketProvider>
        </UsersProvider>
      </MainProvider>
    </ChakraProvider>
  )
}

export default App;
