import "./list.scss";
import Sidebar from "../../components/sidebarMa/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const GarageForms = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
      </div>
    </div>
  );
};

export default GarageForms;
