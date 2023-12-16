import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import maintain from "../../Image/maintain.png";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
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
            <li>
              <ListAltIcon className="icon" />
              <span>Order-forms</span>
            </li>
          </NavLink>
          {/* <NavLink
            to="/garaCustomer"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "none")}
          >
            <li>
              <ListAltIcon className="icon" />
              <span>Customer</span>
            </li>
          </NavLink> */}
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
