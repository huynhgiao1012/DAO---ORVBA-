import "./list.scss";
import Sidebar from "../../components/sidebarMa/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatableForm/Datatable";
const GarageForms = () => {
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

export default GarageForms;
