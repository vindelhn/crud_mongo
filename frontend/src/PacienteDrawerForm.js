

import {Drawer, Input, Col, Select, Form, Row, Button, Spin, DatePicker} from 'antd';
import {addNewPaciente} from "./client";
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from "react";
import {successNotification,errorNotification} from "./Notification";
import dayjs from "dayjs";
const {Option} = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


function PacienteDrawerForm({showDrawer, setShowDrawer, fetchPacientes}) {

    const onCLose = () => setShowDrawer(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [form] = Form.useForm(); // Create a form instance
    const onFinish = paciente => {
        paciente.emails = emails.map((email) => ({ email }));
        paciente.telefonos = telefonos.map((telefono) => ({ telefono }));

          //alert(JSON.stringify(paciente, null, 2));

        setSubmitLoading(true);

        addNewPaciente(paciente)
            .then(() => {
                console.log("Paciente added");
                setShowDrawer(false);
                form.resetFields();
                fetchPacientes();
                successNotification("Paciente agregado");
            })
            .catch(() => {
                console.log("Paciente not added");
                errorNotification("Paciente no agregado");
                setShowDrawer(false);
            }).finally(() => {

            setSubmitLoading(false);
           }
      )
    };
    const [date, setDate] = useState(null);

    const handleChangeDate = (date, dateString) => {
        setDate(dateString); // dateString is in the specified format
    };

    const { Option } = Select;


        const [emails, setEmails] = useState([]);
        const [telefonos, setTelefonos] = useState([]);

        const handleChangeTel = (value) => {
            setTelefonos(value);
        };

        const handleChange = (value) => {
            setEmails(value);
        };

    const handleBlurTel = (value) => {
        if (value && !telefonos.includes(value) ) {
            setTelefonos([...telefonos, value]);
        }
    };

        const handleBlur = (value) => {
            if (value && !emails.includes(value) && isValidEmail(value)) {
                setEmails([...emails, value]);
            }
        };

        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

    const onFinishFailed = errorInfo => {
        // alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Nuevo Paciente"
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
                        name="nombre"
                        label="Nombre"
                        rules={[{required: true, message: 'ingrese Nombre de paciente'}]}
                    >
                        <Input placeholder="Nombre de Paciente"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="apellido"
                        label="Apellido"
                        rules={[{required: true, message: 'ingrese el Apellido del paciente'}]}
                    >
                        <Input placeholder="Apellido"/>
                    </Form.Item>

                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="fechaNacimiento"
                        label="Fecha Nacimiento"
                        rules={[{required: true, message: 'ingrese Nombre de paciente'}]}
                    >
                        <DatePicker
                            format="YYYY-MM-DD" // Specify the format
                            value={date ? dayjs(date, "YYYY-MM-DD") : null} // Parse the value if needed
                            onChange={handleChangeDate}
                            style={{ width: "100%" }}
                            placeholder="Select a date"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="emails"
                        label="Correos"
                        rules={[{required: true, message: 'ingrese correo de paciente'}]}
                    >
                        <Select
                            mode="tags"
                            style={{ width: "100%" }}
                            placeholder="Type emails and press Enter"
                            value={emails}
                            onChange={handleChange}
                            tokenSeparators={[",", " "]}
                            onBlur={(e) => handleBlur(e.target.value)}
                        >
                            {
                                emails.map((email) => (
                                <Option key={email}>{email}</Option>
                               ))
                            }
                        </Select>

                    </Form.Item>

                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="telefonos"
                        label="Telefonos"
                        rules={[{required: true, message: 'ingrese telefono de paciente'}]}
                    >
                        <Select
                            mode="tags"
                            style={{ width: "100%" }}
                            placeholder="Ingrese el telefono"
                            value={telefonos}
                            onChange={handleChangeTel}
                            tokenSeparators={[",", " "]}
                            onBlur={(e) => handleBlurTel(e.target.value)}
                        >
                            {telefonos.map((telefono) => (
                                <Option key={telefono}>{telefono}</Option>
                            ))}
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

export default PacienteDrawerForm;
