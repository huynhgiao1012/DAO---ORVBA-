import "./style.scss";
import Sidebar from "../../components/sidebarMa/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatableAc/Datatable";
const Accountant = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default Accountant;
