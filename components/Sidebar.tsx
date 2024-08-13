import { Layout, Menu } from 'antd';
import {
    FileImageOutlined,
    SettingOutlined,
    AppstoreOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;

const Sidebar = () => (
    <Sider>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }} >
            <img
                src="https://cylab-temp-testing-bucket.s3.amazonaws.com/images/ultron-logo.svg" alt="Ultron-logo"
                style={{
                    width: '80%',
                    padding: '16px',
                }}
            />
        </div>
        <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<FileImageOutlined />}>
                <Link href="/galleries">Image sets</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<AppstoreOutlined />}>
                <Link href="/models">Models</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
                <Link href="/features">Feature sets</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<SearchOutlined />}>
                <Link href="/search">Search</Link>
            </Menu.Item>
        </Menu>
    </Sider>
);

export default Sidebar;
