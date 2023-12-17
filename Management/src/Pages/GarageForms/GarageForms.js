import "./list.scss";
import Sidebar from "../../components/sidebarMa/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatableForm/Datatable";
import Datatable2 from "../../components/datatableFormE/Datatable";
import Datatable3 from "../../components/datatableFormM/Datatable";
import { Tabs } from "antd";
const GarageForms = () => {
  const onChange = (key) => {
    // console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "ALL FORMS",
      children: <Datatable />,
    },
    {
      key: "2",
      label: "EMERGENCY FORMS",
      children: <Datatable2 />,
    },
    {
      key: "3",
      label: "MAINTENANCE FORMS",
      children: <Datatable3 />,
    },
  ];
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          tabBarStyle={{
            paddingLeft: 20,
            color: "#34acaf",
            fontWeight: "bold",
            marginBottom: 0,
          }}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
};

export default GarageForms;
