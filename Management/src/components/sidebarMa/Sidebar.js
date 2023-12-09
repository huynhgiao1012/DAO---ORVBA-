import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logo from "../../Image/logo.png";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="top">
        <div className="avt">
          <img src={logo} style={{ width: 60, height: 60 }} />
        </div>
        <span className="name">Hi ! Nguyen Hoang Minh</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/garaDetails" style={{ textDecoration: "none" }}>
            <li>
              <StorefrontIcon className="icon" />
              <span>Garage Details</span>
            </li>
          </Link>
          <p className="title">STAFF MANAGEMENT</p>
          <Link to="/mechanic" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Mechanic</span>
            </li>
          </Link>
          <Link to="/accountant" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Accountant</span>
            </li>
          </Link>
          <p className="title">GARAGE MANAGEMENT</p>
          <Link to="/garaServices" style={{ textDecoration: "none" }}>
            <li>
              <CarRepairIcon className="icon" />
              <span>Services</span>
            </li>
          </Link>
          <Link to="/garaForms" style={{ textDecoration: "none" }}>
            <li>
              <ListAltIcon className="icon" />
              <span>Order-forms</span>
            </li>
          </Link>
          <Link to="/garaCustomer" style={{ textDecoration: "none" }}>
            <li>
              <ListAltIcon className="icon" />
              <span>Customer</span>
            </li>
          </Link>
          <p className="title">PROFILE</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>My Profile</span>
          </li>
          <li onClick={() => logOut()}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
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
