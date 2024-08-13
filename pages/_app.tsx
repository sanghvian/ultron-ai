import { Layout } from 'antd';
import Sidebar from '../components/Sidebar'; // Adjust the import path if needed
import type { AppProps } from 'next/app';
import 'antd/dist/reset.css'; // Import Ant Design styles

const { Content } = Layout;

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <Content style={{ margin: '16px' }}>
                    <Component {...pageProps} />
                </Content>
            </Layout>
        </Layout>
    );
}

export default MyApp;
