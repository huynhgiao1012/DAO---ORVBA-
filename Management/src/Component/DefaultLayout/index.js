import { useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import logo from "../../Image/logo.png";
import Home from "../../Pages/home/Home";
import Mechanic from "../../Pages/Mechanic/Mechanic";
import Accountant from "../../Pages/Accountant/Accountant";
import GarageService from "../../Pages/GarageService/GarageService";
import GarageDetails from "../../Pages/GarageDetails/GarageDetails";
import GarageCustomer from "../../Pages/GarageCustomer/GarageCustomer";
import GarageForms from "../../Pages/GarageForms/GarageForms";
import MyProfile from "../../Pages/MyProfile/MyProfile";
import ManagerHome from "../../Pages/mHome/index";
import Login from "../../Pages/Login/index";
import List from "../../Pages/list/List";
import ListService from "../../Pages/ListService/List";
import Single from "../../Pages/single/Single";
import New from "../../Pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "../../formSource";
import "../../style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

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
      </Routes>
    </div>
  );
};

const DefaultLayout = withTranslation()(DefaultLayoutComponent);
export default DefaultLayout;
