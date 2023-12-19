import "./admin2.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar2/Navbar";
import {
  useGetUserDetailMutation,
  useUpdateInfoMutation,
} from "../../../services/User";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row, Form, Input, Upload, Skeleton } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { IP } from "../../../Utils/constants";
import Datatable from "../../../components/datatable2/Datatable";
const GarageMana = () => {
  const navigate = useNavigate();
  const loadData = () => {};
  useEffect(() => {
    loadData();
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
        <Datatable />
      </div>
    </div>
  );
};

export default GarageMana;
