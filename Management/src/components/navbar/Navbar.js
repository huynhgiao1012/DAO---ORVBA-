import "./navbar.scss";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailMutation } from "../../services/User";
import { io } from "socket.io-client";

const Navbar = () => {
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
    // const socketIo = io("http://localhost:3000");
    // socketIo.on("getEmergencyForm", (data) => {
    //   if (data) {
    //     getForms()
    //       .unwrap()
    //       .then((payload) => {
    //         setForms([]);
    //         setForms((prev) => [...prev, ...payload.orderForm]);
    //       })
    //       .catch((error) => console.log(error));
    //   }
    // });
  }, []);
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
    <div className="navbar">
      <div className="wrapper">
        <div className="name">
          {/* <img src={loading} /> */}
          <h2>Welcome back !</h2>
        </div>
        <div className="items">
          {/* <div className="mode" style={{ color: "#cccccc" }}>
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
            <h4>Dark mode</h4>
          </div> */}
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
