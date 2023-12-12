import "./style4.scss";
import { DataGrid } from "@mui/x-data-grid";
import { formColumn } from "../../datatablesource";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllFormMutation } from "../../services/Manager";
import { Col, Form, Input, Row, Drawer, Popconfirm } from "antd";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [getAllForm] = useGetAllFormMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleOpen = (data) => {
    setOpen(true);
    form.setFieldsValue({
      id: data.id,
      service: data.service,
      type: data.type,
      status: data.status,
      date: data.date,
      time: data.time,
      isPaid: data.isPaid,
      isFeedback: data.isFeedback,
    });
  };
  const handleClose = () => setOpen(false);

  const loadData = () => {
    setData([]);
    getAllForm()
      .unwrap()
      .then((payload) => {
        var newArr = [];
        payload.orderForm.map((val, index) => {
          newArr.push({
            id: val._id,
            service: val.service,
            type: val.type,
            status: val.status,
            date: val.date,
            time: val.time,
            isPaid: val.isPaid,
            isFeedback: val.isFeedback,
          });
        });
        setData((prev) => [...prev, ...newArr]);
      })
      .catch((error) => {
        if (error.status === 401) {
          logOut();
        }
      });
  };
  useEffect(() => {
    setData([]);
    loadData();
  }, []);
  const cancelConfirm = (e) => {
    console.log(e);
  };
  const handleDelete = async (id) => {
    // await deleteMechanic({ id: id })
    //   .unwrap()
    //   .then((payload) => {
    //     if (payload.success) {
    //       <Alert severity="success">{payload.message}</Alert>;
    //       loadData();
    //     }
    //   });
  };
  // const handleEdit = (id) => {
  //   handleOpen(id);
  //   setIsEdit(true);
  // };
  const handleView = (data) => {
    handleOpen(data);
    setIsEdit(false);
  };
  const onSubmit = async (values) => {
    console.log(values);
    if (isEdit) {
      // await updateUser({
      //   id: values.Id,
      //   name: values.Name,
      //   phone: values.Phone,
      // })
      //   .unwrap()
      //   .then((payload) => {
      //     if (payload.success === true) {
      //       setOpen(false);
      //       notification.open({
      //         message: "Update profile",
      //         description: "Success",
      //       });
      //       loadData();
      //     } else {
      //       notification.open({
      //         message: "Update profile",
      //         description: "False",
      //       });
      //     }
      //   });
    } else {
      // await createMechanicAccount({
      //   name: values.Name,
      //   email: values.Email,
      //   phone: values.Phone,
      //   group: values.Group,
      // })
      //   .unwrap()
      //   .then((payload) => {
      //     alert(payload.message);
      //     setIsModalOpen(false);
      //     loadData();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  };
  // const handleChange = (SelectChangeEvent) => {
  //   // settab(SelectChangeEvent.target.value);
  //   // var newArr = [];
  //   // getAllUser()
  //   //   .unwrap()
  //   //   .then((payload) => {
  //   //     if (payload.success === true) {
  //   //       payload.data.map((val) => {
  //   //         newArr.push({
  //   //           id: val._id,
  //   //           username: val.name,
  //   //           img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   //           status: val.isActive ? "active" : "inactive",
  //   //           email: val.email,
  //   //           phone: val.phone,
  //   //           role: val.role,
  //   //           dbId: val._id,
  //   //         });
  //   //       });
  //   //     }
  //   //     if (SelectChangeEvent.target.value === 20) {
  //   //       const arr = newArr.filter((val) => {
  //   //         if (val.role === "customer") {
  //   //           return val;
  //   //         }
  //   //       });
  //   //       setData([]);
  //   //       setData((prev) => [...prev, ...arr]);
  //   //     } else if (SelectChangeEvent.target.value === 30) {
  //   //       const arr = newArr.filter((val) => {
  //   //         if (val.role === "company") {
  //   //           return val;
  //   //         }
  //   //       });
  //   //       setData([]);
  //   //       setData((prev) => [...prev, ...arr]);
  //   //     } else if (SelectChangeEvent.target.value === 40) {
  //   //       const arr = newArr.filter((val) => {
  //   //         if (val.role === "admin") {
  //   //           return val;
  //   //         }
  //   //       });
  //   //       setData([]);
  //   //       setData((prev) => [...prev, ...arr]);
  //   //     } else {
  //   //       setData([]);
  //   //       setData((prev) => [...prev, ...newArr]);
  //   //     }
  //   //   });
  // };
  const actionColumn = [
    {
      field: "isPaid",
      headerName: "Payment Status",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row.isPaid) {
          return (
            <div
              style={{
                backgroundColor: "#34acaf",
                color: "white",
                borderRadius: 10,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <DoneIcon />
            </div>
          );
        } else {
          return (
            <div
              style={{
                backgroundColor: "#196462",
                color: "white",
                borderRadius: 10,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <ClearIcon />
            </div>
          );
        }
      },
    },
    {
      field: "isFeedback",
      headerName: "Feedback Status",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row.isFeedback) {
          return (
            <div
              style={{
                backgroundColor: "#34acaf",
                color: "white",
                borderRadius: 10,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <DoneIcon />
            </div>
          );
        } else {
          return (
            <div
              style={{
                backgroundColor: "#196462",
                color: "white",
                borderRadius: 10,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <ClearIcon />
            </div>
          );
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      headerAlign: "center",
      renderCell: (params) => {
        console.log(params);
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => handleView(params.row)}>
              View
            </div>
            <Popconfirm
              title="DELETE ACCOUNT"
              description="Are you sure to delete?"
              onConfirm={() => handleDelete(params.row.id)}
              onCancel={cancelConfirm}
              okText="Yes"
              cancelText="No"
            >
              <div className="deleteButton">Delete</div>
            </Popconfirm>
            {/* <div
              className="editButton"
              onClick={() => handleEdit(params.row._id)}
            >
              Edit
            </div> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={formColumn.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        disableVirtualization
        rowSelection={false}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "white",
        }}
      />
      <Drawer width={500} onClose={handleClose} open={open}>
        <p style={{ fontSize: "30px", color: "#34acaf", fontWeight: "bold" }}>
          Form's Detail
        </p>
        <Form
          form={form}
          name="form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="id"
                label={<h3 style={{ color: "#34acaf" }}>ID</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                  readOnly={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="service"
                label={<h3 style={{ color: "#34acaf" }}>Service</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                  readOnly={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label={<h3 style={{ color: "#34acaf" }}>Type</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label={<h3 style={{ color: "#34acaf" }}>Status</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                  readOnly={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label={<h3 style={{ color: "#34acaf" }}>Date</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label={<h3 style={{ color: "#34acaf" }}>Time</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                  readOnly={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="isPaid"
                label={<h3 style={{ color: "#34acaf" }}>Paid Status</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="isFeedback"
                label={<h3 style={{ color: "#34acaf" }}>Feedback Status</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default Datatable;
