import { Layout, Canvas, CanvasToolbar, CanvasAvatars } from "../components";
import { CanvasProvider } from '../context/CanvasContext';

const CanvasPage = () => {

    return (
        <Layout>
            <CanvasProvider>
                <Canvas />
                <CanvasToolbar />
                <CanvasAvatars />
            </CanvasProvider>
        </Layout>
    )
}
export default CanvasPage;