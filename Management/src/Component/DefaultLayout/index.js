import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import Home from "../../Pages/home/Home";
import Mechanic from "../../Pages/Mechanic/Mechanic";
import Accountant from "../../Pages/Accountant/Accountant";
import GarageService from "../../Pages/GarageService/GarageService";
import GarageDetails from "../../Pages/GarageDetails/GarageDetails";
import GarageCustomer from "../../Pages/GarageCustomer/GarageCustomer";
import GarageForms from "../../Pages/GarageForms/GarageForms";
import AdminProfile from "../../Pages/Admin/AdminProfile";
import AccountMana from "../../Pages/Admin/AccountMana";
import GarageMana from "../../Pages/Admin/GarageMana";
import MyProfile from "../../Pages/MyProfile/MyProfile";
import AccountantProfile from "../../Pages/AccountantPages/Profile/index";
import CarSpare from "../../Pages/AccountantPages/CarSpare/index";
import OrderForm from "../../Pages/AccountantPages/OrderForm/index";
// import ManagerHome from "../../Pages/mHome/index";
// import Login from "../../Pages/Login/index";
import List from "../../Pages/list/List";
import ListService from "../../Pages/ListService/List";
import { Routes, Route } from "react-router-dom";
import "../../style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
const DefaultLayoutComponent = ({ socket }) => {
  const { i18n } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(window.location.pathname);
    }
  }, []);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/mHome" element={<MyProfile />} />
        <Route path="users">
          <Route index element={<List />} />
        </Route>
        <Route path="mechanic">
          <Route index element={<Mechanic socket={socket} />} />
        </Route>
        <Route path="accountant">
          <Route index element={<Accountant socket={socket} />} />
        </Route>
        <Route path="garaServices">
          <Route index element={<GarageService socket={socket} />} />
        </Route>
        <Route path="garaDetails">
          <Route index element={<GarageDetails socket={socket} />} />
        </Route>
        <Route path="garaCustomer">
          <Route index element={<GarageCustomer socket={socket} />} />
        </Route>
        <Route path="garaForms">
          <Route index element={<GarageForms socket={socket} />} />
        </Route>
        <Route path="services">
          <Route index element={<ListService socket={socket} />} />
        </Route>
        <Route path="myProfile">
          <Route index element={<MyProfile socket={socket} />} />
        </Route>
        <Route path="adminProfile">
          <Route index element={<AdminProfile socket={socket} />} />
        </Route>
        <Route path="account">
          <Route index element={<AccountMana socket={socket} />} />
        </Route>
        <Route path="garageManagement">
          <Route index element={<GarageMana socket={socket} />} />
        </Route>
        <Route path="accountantProfile">
          <Route index element={<AccountantProfile socket={socket} />} />
        </Route>
        <Route path="carSpares">
          <Route index element={<CarSpare socket={socket} />} />
        </Route>
        <Route path="form">
          <Route index element={<OrderForm socket={socket} />} />
        </Route>
      </Routes>
    </div>
  );
};

const DefaultLayout = withTranslation()(DefaultLayoutComponent);
export default DefaultLayout;
