import { useRouter } from 'next/router';
import { useMainContext } from '../context/MainContext';
import { CanvasProvider } from '../context/CollaborativeCanvasContext';
import { Layout, Canvas, CanvasToolbar, CanvasAvatars } from "../components";

const CanvasPage = () => {
    const { name, setName, room, setRoom } = useMainContext();
    const router = useRouter();

    // useEffect(() => { if(!name) router.push('/') }, [router, name]);

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