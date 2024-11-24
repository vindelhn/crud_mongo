

import {Drawer, Input, Col, Select, Form, Row, Button, Spin, DatePicker} from 'antd';
import {addNewSintoma} from "./client";
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from "react";
import {successNotification,errorNotification} from "./Notification";
import dayjs from "dayjs";
const {Option} = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


function SintomaDrawerForm({showDrawer, setShowDrawer, fetchPacientes}) {

    const onCLose = () => setShowDrawer(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [form] = Form.useForm();
    const onFinish = sintoma => {
          //alert(JSON.stringify(paciente, null, 2));

        setSubmitLoading(true);

        addNewSintoma(sintoma)
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
    const [date, setDate] = useState(null);


    const { Option } = Select;



    const onFinishFailed = errorInfo => {
        // alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Nuevo Sintoma"
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
                        rules={[{required: true, message: 'ingrese Nombre del sintoma'}]}
                    >
                        <Input placeholder="Nombre de sintoma"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="descripcion"
                        label="Descripcion"
                        rules={[{required: true, message: 'ingrese la descripcion del sintoma'}]}
                    >
                        <Input placeholder="Descripion de sintoma"/>
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

export default SintomaDrawerForm;
