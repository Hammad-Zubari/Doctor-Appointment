import React, { useState, useEffect, useRef } from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "../data/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const sidebarRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains("user-name-link")
      ) {
        setShowSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSidebar]);

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <div className="layout-bg">
      {/* Header directly on background */}
      <div className="header-on-bg">
        <div className="notification-bell">
          <Badge
            count={user && user.notifcation.length}
            onClick={() => {
              navigate("/notification");
            }}
          >
            <i className="fa-solid fa-bell"></i>
          </Badge>
          <span
            className="user-name-link"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {user?.name}
          </span>
        </div>
      </div>

      {/* Blurred Glass Container */}
      <div className="glass-container">
        <div className="body">{children}</div>
      </div>

      {/* Sidebar Drawer */}
      <div className={`sidebar-drawer ${showSidebar ? "show" : ""}`} ref={sidebarRef}>
        <div className="menu">
          {SidebarMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                className={`menu-item ${isActive && "active"}`}
                key={menu.name}
                onClick={() => setShowSidebar(false)}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}
          <div className="menu-item" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <Link to="/login">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
