import "./list.scss";
import Sidebar from "../../components/sidebarMa/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Col, Form, Input, Row, Card, Button } from "antd";
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
        <Row style={{ marginBottom: 20 }}>
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
              style={{ marginLeft: 30, color: "#3C3434", marginTop: 20 }}
            >
              <Row>
                <h1 style={{ fontWeight: "bolder" }}>Garage Details</h1>
              </Row>
              <Row>
                <img
                  src={data.img}
                  style={{ width: "87%", height: 200, marginBottom: 20 }}
                />
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label={<h3 style={{ color: "#34acaf" }}>Name</h3>}
                    rules={[
                      {
                        type: "string",
                      },
                      { whitespace: true },
                      { min: 3 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{
                        border: "1px solid #98C4C4",
                        width: "100%",
                      }}
                      type="string"
                      name="name"
                      value={data.name}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<h3 style={{ color: "#34acaf" }}>Phone</h3>}
                    rules={[
                      {
                        type: "string",
                      },
                      { whitespace: true, min: 10, max: 12 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: "100%" }}
                      value={data.phone}
                      name="phone"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label={<h3 style={{ color: "#34acaf" }}>Address</h3>}
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 10 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: "100%" }}
                      name="address"
                      value={data.address}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<h3 style={{ color: "#34acaf" }}>Email</h3>}
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 10 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: "100%" }}
                      name="email"
                      value={data.email}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label={<h3 style={{ color: "#34acaf" }}>Open Time</h3>}
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 10 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: "100%" }}
                      name="openTime"
                      value={data.openTime}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<h3 style={{ color: "#34acaf" }}>Close Time</h3>}
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 10, max: 400 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: "100%" }}
                      name="closeTime"
                      value={data.closeTime}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label={<h3 style={{ color: "#34acaf" }}>Longitude</h3>}
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 10 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: "100%" }}
                      name="longitude"
                      value={data.longitude}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<h3 style={{ color: "#34acaf" }}>Latitude</h3>}
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 10, max: 400 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: "100%" }}
                      name="latitude"
                      value={data.latitude}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label={<h3 style={{ color: "#34acaf" }}>Description</h3>}
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 10 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: "100%" }}
                      name="description"
                      value={data.description}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={<h3 style={{ color: "#34acaf" }}>ID</h3>}>
                    <Input
                      style={{ border: "1px solid #98C4C4", width: "100%" }}
                      value={data._id}
                      readOnly
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}></Col>
                <Col span={12}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    form="form"
                    style={{
                      width: "75%",
                      textAlign: "center",
                      backgroundColor: "#34acaf",
                      color: "white",
                      border: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col span={11}>
            <div style={{ color: "#3C3434", marginTop: 20 }}>
              <h1>Statistics</h1>
              <Row gutter={16} style={{ marginBottom: 10 }}>
                <Col span={12}>
                  <Card
                    title="TOTAL STAFF"
                    bordered={true}
                    style={{ border: "1px solid #98C4C4" }}
                    headStyle={{
                      borderBottom: "1px dashed #98C4C4",
                      color: "#98C4C4",
                      fontStyle: "italic",
                    }}
                  >
                    Card content
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    title="TOTAL FORMS"
                    bordered={true}
                    style={{ border: "1px solid #98C4C4" }}
                    headStyle={{
                      borderBottom: "1px dashed #98C4C4",
                      color: "#98C4C4",
                      fontStyle: "italic",
                    }}
                  >
                    Card content
                  </Card>
                </Col>
              </Row>
              <Row></Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Card
                    title="TOTAL SERVICE"
                    bordered={true}
                    style={{ border: "1px solid #98C4C4" }}
                    headStyle={{
                      borderBottom: "1px dashed #98C4C4",
                      color: "#98C4C4",
                      fontStyle: "italic",
                    }}
                  >
                    Card content
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    title="TOTAL REVENUE"
                    bordered={true}
                    style={{ border: "1px solid #98C4C4" }}
                    headStyle={{
                      borderBottom: "1px dashed #98C4C4",
                      color: "#98C4C4",
                      fontStyle: "italic",
                    }}
                    bodyStyle={{
                      color: "#196462",
                      fontWeight: "bold",
                    }}
                  >
                    Card content
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GarageDetails;
