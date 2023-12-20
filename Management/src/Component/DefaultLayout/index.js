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
const DefaultLayoutComponent = () => {
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
          <Route index element={<Mechanic />} />
        </Route>
        <Route path="accountant">
          <Route index element={<Accountant />} />
        </Route>
        <Route path="garaServices">
          <Route index element={<GarageService />} />
        </Route>
        <Route path="garaDetails">
          <Route index element={<GarageDetails />} />
        </Route>
        <Route path="garaCustomer">
          <Route index element={<GarageCustomer />} />
        </Route>
        <Route path="garaForms">
          <Route index element={<GarageForms />} />
        </Route>
        <Route path="services">
          <Route index element={<ListService />} />
        </Route>
        <Route path="myProfile">
          <Route index element={<MyProfile />} />
        </Route>
        <Route path="adminProfile">
          <Route index element={<AdminProfile />} />
        </Route>
        <Route path="account">
          <Route index element={<AccountMana />} />
        </Route>
        <Route path="garageManagement">
          <Route index element={<GarageMana />} />
        </Route>
        <Route path="accountantProfile">
          <Route index element={<AccountantProfile />} />
        </Route>
        <Route path="carSpares">
          <Route index element={<CarSpare />} />
        </Route>
        <Route path="form">
          <Route index element={<OrderForm />} />
        </Route>
      </Routes>
    </div>
  );
};

const DefaultLayout = withTranslation()(DefaultLayoutComponent);
export default DefaultLayout;
