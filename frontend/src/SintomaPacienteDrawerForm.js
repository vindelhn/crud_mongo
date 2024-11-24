

import {Drawer, Input, Col, Select, Form, Row, Button, Spin, DatePicker} from 'antd';
import {addNewSintomaPaciente, getAllPacientes, getAllSintomas} from "./client";
import {LoadingOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {successNotification,errorNotification} from "./Notification";
import dayjs from "dayjs";
const {Option} = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


function SintomaPacienteDrawerForm({showDrawer, setShowDrawer, fetchPacientes}) {

    const onCLose = () => setShowDrawer(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [sintomas, setSintomas] = useState([]);
    const [form] = Form.useForm();
    const [pacientes, setPacientes] = useState([]);
    const fetchPacientesHere = () =>
        getAllPacientes()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPacientes(data);
            }).catch(err => {
            console.log(err.response);
            err.response.json().then(data => {
                console.log(data);
                errorNotification("Ocurrio un error",data.message);

            })
        });


    const fetchSintomas = () =>
        getAllSintomas()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSintomas(data);

            }).catch(err => {
            console.log(err.response);
            err.response.json().then(data => {
                console.log(data);
                errorNotification("Ocurrio un error",data.message);

            })
        });


    useEffect(() => {
        console.log("component is mounted");
        fetchSintomas();
        fetchPacientesHere();
    }, []);

    const onFinish = sintoma => {

        //alert(JSON.stringify(sintoma, null, 2));

        setSubmitLoading(true);

        addNewSintomaPaciente(sintoma)
            .then(() => {
                console.log("Sintoma added");
                setShowDrawer(false);
                form.resetFields();
                fetchPacientes();
                successNotification("Sintoma agregado");
            })
            .catch(() => {
                console.log("Sintoma not added");
                errorNotification("Sintoma no agregado");
                setShowDrawer(false);
            }).finally(() => {
            setSubmitLoading(false);
           }
      )
    };
    const [sintomaId, setSintomaId] = useState(null);
    const [pacienteId, setPacienteId] = useState(null);


    const handleChange = (value) => {
        setSintomaId(value);
    };

    const handleChange2 = (value) => {
        setPacienteId(value);
    };

    const onFinishFailed = errorInfo => {
        // alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Nuevo Sintoma de Paciente"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              form={form}
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="sintomaId"
                        label="Sintoma"
                        rules={[{required: true, message: 'ingrese el sintoma'}]}
                    >
                        <Select
                            style={{ width: "100%" }}
                           // value={sintomas}
                            onChange={handleChange}
                            tokenSeparators={[",", " "]}
                        >
                            {
                                sintomas.map((sintoma) => (
                                    <Option key={sintoma.id}>{sintoma.nombre}</Option>
                                ))
                            }
                        </Select>

                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="pacienteId"
                        label="Paciente"
                        rules={[{required: true, message: 'ingreseel el paciente'}]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            // value={sintomas}
                            onChange={handleChange2}
                            tokenSeparators={[",", " "]}
                        >
                            {
                                pacientes.map((paciente) => (
                                    <Option key={paciente.id}>{paciente.nombre}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Guardar
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitLoading && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default SintomaPacienteDrawerForm;
