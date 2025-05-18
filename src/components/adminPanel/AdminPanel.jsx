import { useEffect, useState } from "react";
import { message } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { RESPONSE_STATUS } from "@/const";
import { userApi } from "@/api/index.js";
import AdminPanelNav from "./AdminPanelNav.jsx";
import MobileAdminPanelNav from "./MobileAdminPanelNav.jsx";
import AdminPanelLogo from "./AdminPanelLogo.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUserSelector } from "@/store/users";

import "./sass/admin-panel.scss";
import "./sass/mobile-admin-panel.scss";

function AdminPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("unauthorized");
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

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
    dispatch(getUserProfile());

    updateMenuListHeight();

    if (isLoading) {
      userApi
        .getProfile()
        .then((data) => {
          setRole(data.role);
          setIsLoading(false);
        })
        .catch(() => {});
    }
  }, [isLoading, role]);

  return (
    <div id="admin-panel" className="admin-panel">
      {role != "unauthorized" && (
        <>
          <div id="sidebar" className="admin-panel__menu">
            <AdminPanelLogo />
            <AdminPanelNav role={role} />
          </div>
          <div id="mobile-menu" className="mobile-admin-panel__menu">
            <MobileAdminPanelNav role={role} />
          </div>
        </>
      )}
      <div
        id="content"
        className={`admin-panel__content${
          role == "unauthorized" ? `__guest` : ``
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanel;
