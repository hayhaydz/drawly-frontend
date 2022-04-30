import { Layout, Canvas, CanvasToolbar, CanvasZoom } from "../components";
import { CanvasProvider } from '../context/CanvasContext';

const CanvasPage = () => {

    return (
        <Layout>
            <CanvasProvider>
                <Canvas />
                <CanvasToolbar />
                <CanvasZoom />
            </CanvasProvider>
        </Layout>
    )
}
export default CanvasPage;