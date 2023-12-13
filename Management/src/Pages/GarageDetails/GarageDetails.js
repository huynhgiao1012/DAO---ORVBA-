import "./list.scss";
import Sidebar from "../../components/sidebarMa/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Col, Form, Input, Row, Drawer, Popconfirm, Select } from "antd";
import { useGetGarageDetailMutation } from "../../services/Manager";
import { useEffect, useState } from "react";
import { Value } from "sass";
const GarageDetails = () => {
  const [getGarageDetail] = useGetGarageDetailMutation();
  const [form] = Form.useForm();
  const [data, setData] = useState({
    _id: "",
    address: "",
    closeTime: "",
    description: "",
    email: "",
    img: "",
    latitude: 0,
    longitude: 0,
    name: "",
    openTime: "",
    phone: "",
    transferInfo: [],
  });
  useEffect(() => {
    getGarageDetail()
      .unwrap()
      .then((payload) => {
        setData((prev) => ({ ...prev, ...payload.garage }));
      })
      .catch((error) => console.log(error));
  }, []);
  const onSubmit = async (Value) => {};
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Row>
          <Col span={12}>
            <Form
              form={form}
              name="form"
              labelCol={{ span: 18 }}
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              autoComplete="off"
              layout="vertical"
              style={{ marginLeft: 30, color: "#3C3434" }}
            >
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Garage's Name"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter name",
                        type: "string",
                      },
                      { whitespace: true },
                      { min: 3 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 220 }}
                      type="string"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Phone"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter phone",
                        type: "string",
                      },
                      { whitespace: false, min: 10, max: 12 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 220 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="address"
                    label="Address"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter service",
                        type: "string",
                      },
                      { min: 10 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 220 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="address"
                    label="Address"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter service",
                        type: "string",
                      },
                      { min: 10 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 220 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="address"
                    label="Address"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter service",
                        type: "string",
                      },
                      { min: 10 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 220 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="note"
                    label="Note"
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 10, max: 400 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 220 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                {/* <Col span={12}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    form="form"
                    style={{
                      width: "90%",
                      textAlign: "center",
                      backgroundColor: "#34acaf",
                      color: "white",
                    }}
                  >
                    Submit
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    onClick={handleClose}
                    style={{
                      width: "90%",
                      textAlign: "center",
                      backgroundColor: "#98C4C4",
                      color: "white",
                    }}
                  >
                    Cancel
                  </Button>
                </Col> */}
              </Row>
            </Form>
          </Col>
          <Col span={12}>col-12</Col>
        </Row>
      </div>
    </div>
  );
};

export default GarageDetails;
