import { useEffect, useState } from "react";
import { message } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { RESPONSE_STATUS } from "@constants";
import { userApi } from "@api/index.js";
import AdminPanelNav from "./AdminPanelNav.jsx";
import AdminPanelLogo from "./AdminPanelLogo.jsx";

import "./sass/admin-panel.scss";

function AdminPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("unauthorized");
  const navigate = useNavigate();

  document.addEventListener("DOMContentLoaded", function () {
    const menuList = document.querySelector(".admin-panel__menu-list");
    const menuListHeight = menuList.offsetHeight;
    document.documentElement.style.setProperty(
      "--menu-list-height",
      `${menuListHeight}px`
    );
  });

  const updateMenuListHeight = () => {
    const menuList = document.querySelector(".admin-panel__menu-list");
    if (menuList) {
      const menuListHeight = menuList.offsetHeight;
      document.documentElement.style.setProperty(
        "--menu-list-height",
        `${menuListHeight}px`
      );
    }
  };

  useEffect(() => {
    updateMenuListHeight();

    if (isLoading) {
      userApi
        .getProfile()
        .then((user) => {
          setRole(user.role);
          setIsLoading(false);
        })
        .catch(() => {
          message.error(
            "Невозможно получить данные. Обратитесь к администратору"
          );
        });
    }
  });

  return (
    <div className="admin-panel">
      <div className="admin-panel__menu">
        <AdminPanelLogo />
        <AdminPanelNav role={role} />
      </div>
      <div className="admin-panel__content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanel;
