import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { NavLink, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import { useGetNewMaintenanceFormMutation } from "../../services/Manager";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [num, setNum] = useState([]);
  const [getNewForm] = useGetNewMaintenanceFormMutation();
  // const logOut = () => {
  //   localStorage.clear();
  //   navigate("/login");
  // };
  // useEffect(() => {
  //   setNum([]);
  //   getNewForm()
  //     .unwrap()
  //     .then((payload) => {
  //       setNum((prev) => [...prev, ...payload.arr]);
  //     })
  //     .catch((error) => {
  //       if (error.data.message === "Token is exprired") {
  //         logOut();
  //       }
  //     });
  // }, []);
  return (
    <div className="sidebar">
      <div className="top">
        <span className="name">DAO - MANAGEMENT</span>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <NavLink
            to="/garaDetails"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "none")}
          >
            <li>
              <StorefrontIcon className="icon" />
              <span>Garage Details</span>
            </li>
          </NavLink>
          <NavLink
            to="/myProfile"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "none")}
          >
            <li>
              <PersonOutlineIcon className="icon" />
              <span>My Profile</span>
            </li>
          </NavLink>
          <p className="title">STAFF MANAGEMENT</p>
          <NavLink
            to="/mechanic"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "none")}
          >
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Mechanic</span>
            </li>
          </NavLink>
          <NavLink
            to="/accountant"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "none")}
          >
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Accountant</span>
            </li>
          </NavLink>
          <p className="title">GARAGE MANAGEMENT</p>
          <NavLink
            to="/garaServices"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "none")}
          >
            <li>
              <CarRepairIcon className="icon" />
              <span>Services</span>
            </li>
          </NavLink>
          <NavLink
            to="/garaForms"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "none")}
          >
            <li
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <ListAltIcon className="icon" />
                <span>Order-forms</span>
              </div>
              {/* <div
                style={{
                  alignSelf: "flex-end",
                }}
              >
                <span
                  style={{
                    width: 25,
                    height: 25,

                    backgroundColor: "red",
                    borderRadius: 50,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 14,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {num.length}
                </span>
              </div> */}
            </li>
          </NavLink>
          <NavLink
            to="/garaFeedback"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "none")}
          >
            <li>
              <FeedbackIcon className="icon" />
              <span>Feedbacks</span>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
