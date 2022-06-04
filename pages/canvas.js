import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMainContext } from '../context/MainContext';
import { CanvasProvider } from '../context/CollaborativeCanvasContext';
import { Layout, Canvas, CanvasToolbar, CanvasAvatars } from "../components";

const CanvasPage = () => {
    const { name, setRoom, isLoggingOut } = useMainContext();
    const router = useRouter();

    //https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    useEffect(() => {
        if(name == '') {
            if(!isLoggingOut) {
                const params = new Proxy(new URLSearchParams(window.location.search), {
                    get: (searchParams, prop) => searchParams.get(prop),
                });
                let value = params.r;
                setRoom(value);
            }
            router.push('/');
        }
    }, [name]);

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