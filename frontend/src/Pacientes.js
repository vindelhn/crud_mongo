import {useState, useEffect} from 'react'
import {getAllPacientes,deletePaciente} from "./client";
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
import PacienteDrawerForm from "./PacienteDrawerForm";

import './App.css';
import {errorNotification, successNotification} from "./Notification";



const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const TheAvatar = ({name}) => {

  if (name.trim().length === 0) {
    return <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined />} />
  } else {
    return <Avatar style={{backgroundColor: '#87d068'}}>{name.substring(0, 1)}</Avatar>
  }
}


const removePaciente = (pacienteId, callback) => {
  deletePaciente(pacienteId).then(() => {
    successNotification("Paciente borrado");
    callback();
  });
}

const columns = fetchPacientes => [

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
    title: 'Apellido',
    dataIndex: 'apellido',
    key: 'apellido',
  },
  {
    title: 'FechaNac',
    dataIndex: 'fechaNacimiento',
    key: 'fechaNacimiento',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, paciente) =>
        <Radio.Group>
          <Popconfirm
              placement='topRight'
              title={`Realmente quiere borrar el paciente?`}
              onConfirm={() => removePaciente(paciente.id, fetchPacientes)}
              okText='Si'
              cancelText='No'>
            <Radio.Button value="small">Borrar</Radio.Button>
          </Popconfirm>
          <Radio.Button value="small">Editar</Radio.Button>
        </Radio.Group>
  }
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [show, setShow] = useState(true);

  const fetchPacientes = () =>
      getAllPacientes()
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setPacientes(data);
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
    fetchPacientes();
  }, []);

  const renderPacientes = () => {
    if (fetching) {
      return <Spin indicator={antIcon}/>
    }
    if (pacientes.length <= 0) {
      return <>
        <Button
            onClick={() => setShowDrawer(!showDrawer)}
            type="primary" shape="round" icon={<PlusOutlined/>} size="small">
          Nuevo Paciente
        </Button>
        <PacienteDrawerForm
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            fetchPacientes={fetchPacientes}
        />
        <Empty/>
      </>
    }
    return <>
      <PacienteDrawerForm
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          fetchPacientes={fetchPacientes}
      />
      <Table
          dataSource={pacientes}
          columns={columns(fetchPacientes)}
          bordered
          title={() =>
              <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                  Nuevo Paciente
                </Button>

                <br/><br/>
                <Tag>pacientes</Tag>
                <Badge
                    className="site-badge-count-109"
                    count={  pacientes.length}
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

          {renderPacientes()}

      </Content>


  </Layout>
}

export default Pacientes;
