import "./list.scss";
import Sidebar from "../../components/sidebarMa/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useGetUserDetailMutation } from "../../services/User";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avt from "../../Image/baoduong.jpg";
import BadgeIcon from "@mui/icons-material/Badge";
const MyProfile = () => {
  const navigate = useNavigate();
  const [getUserDetail] = useGetUserDetailMutation();
  const [data, setData] = useState({
    _id: "",
    email: "",
    isActive: false,
    name: "",
    phone: "",
    role: "",
    img: "",
  });
  useEffect(() => {
    getUserDetail()
      .unwrap()
      .then((payload) => {
        setData((prev) => ({ ...prev, ...payload.data }));
      })
      .catch((error) => {
        if (error.data.message === "Token is exprired") {
          logOut();
        }
      });
  }, []);
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="content">
          <div className="info">
            <img src={data.img !== "" ? data.img : avt} />
            <div className="infoText">
              <h2>{data.name}</h2>
              <h4>Phone number: {data.phone}</h4>
              <h4>Email address: {data.email}</h4>
            </div>
          </div>
          <button>Update</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
