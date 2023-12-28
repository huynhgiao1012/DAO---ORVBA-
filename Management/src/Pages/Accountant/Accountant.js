import "./style.scss";
import Sidebar from "../../components/sidebarMa/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatableAc/Datatable";
const Accountant = ({ socket }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar socket={socket} />
        <Datatable />
      </div>
    </div>
  );
};

export default Accountant;
