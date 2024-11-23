import {useState, useEffect} from 'react'

import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Spin,
    Empty,
    Button, Badge, Tag, Avatar, Popconfirm, Radio,
} from 'antd';

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined,
    PlusOutlined, InfoCircleOutlined, QuestionCircleOutlined
} from '@ant-design/icons';


import './App.css';
import Pacientes from "./Pacientes";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function App() {

    const [collapsed, setCollapsed] = useState(false);

    const [showDrawer, setShowDrawer] = useState(false);
    const [show, setShow] = useState(true);

    const [selectedMenuKey, setSelectedMenuKey] = useState('1');

    useEffect(() => {
        console.log("component is mounted");

    }, []);

    const handleMenuClick = (e) => {
        setSelectedMenuKey(e.key); // Update selected menu key
    };


    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick} >
                <Menu.Item key="1" icon={<UserOutlined />}>
                    Pacientes
                </Menu.Item>
                <Menu.Item key="2" icon={<InfoCircleOutlined />}>
                    Sintomas
                </Menu.Item>
                <Menu.Item key="3" icon={<QuestionCircleOutlined />}>
                    Sintomas Pacientes
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>

                    {selectedMenuKey === '1' && (
                        <div>
                            <Pacientes/>
                        </div>
                    )}
                    {selectedMenuKey === '2' && (
                        <div>
                            <h2>Content for Option 2</h2>
                            {/* You can put the actual content for Option 2 here */}
                        </div>
                    )}
                    {selectedMenuKey === '3' && (
                        <div>
                            <h2>Content for Option 3</h2>
                            {/* You can put the actual content for Option 3 here */}
                        </div>
                    )}

                </div>
            </Content>

        </Layout>
    </Layout>
}

export default App;
