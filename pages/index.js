import { Layout, Login, Canvas } from '../components';
import { CanvasProvider } from '../context/CanvasContext';

const HomePage = () => {

  return (
    <Layout>
      {/* <Login /> */}
      <CanvasProvider>
        <Canvas />
      </CanvasProvider>
    </Layout>
  )
}
export default HomePage;

