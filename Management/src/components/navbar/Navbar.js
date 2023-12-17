import "./navbar.scss";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailMutation } from "../../services/User";
import io from "socket.io-client";
import { useGetNewMaintenanceFormMutation } from "../../services/Manager";

const Navbar = () => {
  const navigate = useNavigate();
  const [getUserDetail] = useGetUserDetailMutation();
  const [getNewForm] = useGetNewMaintenanceFormMutation();
  const [num, setNum] = useState([]);
  const [data, setData] = useState({
    _id: "",
    email: "",
    isActive: false,
    name: "",
    phone: "",
    role: "",
    img: "",
  });
  // useEffect(() => {
  //   const socketIo = io.connect("http://localhost:3000");
  //   socketIo.on("getMaintenanceForm", (data) => {
  //     console.log("data", data);
  //     setNum((prev) => [...prev, data]);
  //   });
  // }, []);

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
    getNewForm()
      .unwrap()
      .then((payload) => {
        console.log(payload);
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
    <div className="navbar">
      <div className="wrapper">
        <div className="name">
          <h2>Welcome back !</h2>
        </div>
        <div className="items">
          <div className="newForm">
            <span className="num">{num.length}</span>
            <button className="btn2">TODAY MAINTENANCE FORM</button>
          </div>
          <button onClick={() => logOut()} className="btn">
            <PowerSettingsNewIcon
              className="icon"
              fontSize="medium"
              style={{ paddingTop: "5px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
