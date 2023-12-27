import "./navbar.scss";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailMutation } from "../../services/User";
import { useGetNewMaintenanceFormMutation } from "../../services/Manager";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useGetUnreadNotiMutation } from "../../services/Notification";
const Navbar = ({ socket }) => {
  const navigate = useNavigate();
  const [getUserDetail] = useGetUserDetailMutation();
  const [getNewForm] = useGetNewMaintenanceFormMutation();
  const [getUnread] = useGetUnreadNotiMutation();
  const [listNoti, setListNoti] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [data, setData] = useState({
    _id: "",
    email: "",
    isActive: false,
    name: "",
    phone: "",
    role: "",
    img: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setListNoti([]);
    setNotifications([]);
    socket.on("getNotification", (data) => {
      if (data) {
        setNotifications((prev) => [...prev, data]);
      }
    });
    getUnread()
      .unwrap()
      .then((payload) => {
        setListNoti((prev) => [...prev, ...payload.data]);
      })
      .catch((error) => {
        if (error.data.message === "Token is exprired") {
          logOut();
        }
      });
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
          <h2>Welcome back !</h2>
        </div>
        <div className="items">
          <div>
            <div>
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{
                  backgroundColor: "#f8f8f8",
                  display: "flex",
                }}
              >
                <span
                  style={{
                    backgroundColor: "red",
                    width: 25,
                    height: 25,
                    color: "white",
                    paddingBottom: 10,
                    borderRadius: 50,
                    fontWeight: "bold",
                    opacity: 0.8,
                  }}
                >
                  {console.log(notifications)}
                  {notifications.length > 0
                    ? notifications.length
                    : listNoti.length}
                </span>
                <h3
                  style={{
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontWeight: "bolder",
                    color: "#3cbcc4",
                  }}
                >
                  Notifications
                </h3>
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                style={{ width: "100%" }}
              >
                {listNoti.length > 0 ? (
                  listNoti.map((val) => {
                    return (
                      <div
                        onClick={handleClose}
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                          width: 400,
                          padding: "10px 0px",
                          margin: "0px 20px",
                          borderBottom: "3px solid #e8e8e8",
                        }}
                      >
                        <h4
                          style={{
                            width: "70%",
                            color: "#3C3434",
                            fontStyle: "oblique",
                          }}
                        >
                          {val.text}
                        </h4>
                        <div style={{ width: "30%" }}>
                          <button
                            style={{
                              border: "none",
                              backgroundColor: "#3cbcc4",
                              color: "white",
                              borderRadius: 10,
                              fontSize: 16,
                              paddingTop: 5,
                              width: "40%",
                              marginRight: 8,
                            }}
                          >
                            <DraftsIcon />
                          </button>
                          <button
                            style={{
                              border: "none",
                              backgroundColor: "red",
                              color: "white",
                              borderRadius: 10,
                              fontSize: 16,
                              paddingTop: 5,
                              width: "40%",
                            }}
                          >
                            <DeleteForeverIcon />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <MenuItem onClick={handleClose}>
                    There are currently no announcements
                  </MenuItem>
                )}
              </Menu>
            </div>
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
