import "./form.scss";
import Sidebar from "../../../components/sidebarAcc/Sidebar";
import Navbar from "../../../components/navbar2/Navbar";

const Form = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
      </div>
    </div>
  );
};

export default Form;
