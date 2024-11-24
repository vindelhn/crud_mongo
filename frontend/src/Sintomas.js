import {useState, useEffect} from 'react'
import {getAllSintomas,deleteSintoma} from "./client";
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
  PlusOutlined
} from '@ant-design/icons';

import './App.css';
import {errorNotification, successNotification} from "./Notification";
import SintomaDrawerForm from "./SintomaDrawerForm";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const TheAvatar = ({name}) => {

  if (name.trim().length === 0) {
    return <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined />} />
  } else {
    return <Avatar style={{backgroundColor: '#87d068'}}>{name.substring(0, 1)}</Avatar>
  }
}


const removeSintoma = (sintomaId, callback) => {
  deleteSintoma(sintomaId).then(() => {
    successNotification("Sintoma borrado");
    callback();
  });
}

const columns = fetchSintomas => [

  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
  },
  {
    title: 'Descripcion',
    dataIndex: 'descripcion',
    key: 'descripcion',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, sintoma) =>
        <Radio.Group>
          <Popconfirm
              placement='topRight'
              title={`Realmente quiere borrar el sintoma?`}
              onConfirm={() => removeSintoma(sintoma.id, fetchSintomas)}
              okText='Si'
              cancelText='No'>
            <Radio.Button value="small">Borrar</Radio.Button>
          </Popconfirm>
          <Radio.Button value="small">Editar</Radio.Button>
        </Radio.Group>
  }
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function Sintomas() {
  const [sintomas, setSintomas] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [show, setShow] = useState(true);

  const fetchSintomas = () =>
      getAllSintomas()
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setSintomas(data);
            setFetching(false);
          }).catch(err => {
        console.log(err.response);
        err.response.json().then(data => {
          console.log(data);
          errorNotification("Ocurrio un error",data.message);

        })
      }).finally(() =>  setFetching(false));

  useEffect(() => {
    console.log("component is mounted");
    fetchSintomas();
  }, []);

  const renderSintomas = () => {
    if (fetching) {
      return <Spin indicator={antIcon}/>
    }
    if (sintomas.length <= 0) {
      return <>
        <Button
            onClick={() => setShowDrawer(!showDrawer)}
            type="primary" shape="round" icon={<PlusOutlined/>} size="small">
          Nuevo Sintoma
        </Button>
        <SintomaDrawerForm
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            fetchPacientes={fetchSintomas}
        />
        <Empty/>
      </>
    }
    return <>
      <SintomaDrawerForm
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          fetchPacientes={fetchSintomas}
      />
      <Table
          dataSource={sintomas}
          columns={columns(fetchSintomas)}
          bordered
          title={() =>
              <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                  Nuevo Sintoma
                </Button>

                <br/><br/>
                <Tag>sintomas</Tag>
                <Badge
                    className="site-badge-count-109"
                    count={  sintomas.length}
                    style={{ backgroundColor: '#52c41a' }}
                />

              </>


          }
          pagination={{pageSize: 50}}
          scroll={{y: 500}}
          rowKey={student => student.id}
      />
    </>

  }

  return <Layout style={{minHeight: '100vh'}}>


      <Content >

          {renderSintomas()}

      </Content>


  </Layout>
}

export default Sintomas;
