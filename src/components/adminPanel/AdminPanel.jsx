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

  useEffect(() => {
    if (isLoading) {
      userApi
        .getProfile()
        .then((response) => {
          setRole(response.data.role);
          setIsLoading(false);
        })
        .catch(() => {
          message.error(
            "panel Невозможно получить данные. Обратитесь к администратору"
          );
        });
    }
  }, [isLoading, role]);

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
