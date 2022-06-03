import { MainProvider } from '../context/MainContext';
import { UsersProvider } from '../context/UsersContext';
import { SocketProvider } from '../context/SocketContext';
import '../styles/global.css';
import 'rc-slider/assets/index.css';

const App = ({ Component, pageProps }) => {
  return (
    <MainProvider>
      <UsersProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </UsersProvider>
    </MainProvider>
  )
}

export default App;
