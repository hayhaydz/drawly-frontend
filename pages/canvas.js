import { Layout, Canvas, CanvasToolbar } from "../components";
import { CanvasProvider } from '../context/CanvasContext';

const CanvasPage = () => {

    return (
        <Layout>
            <CanvasProvider>
                <Canvas />
                <CanvasToolbar />
            </CanvasProvider>
        </Layout>
    )
}
export default CanvasPage;