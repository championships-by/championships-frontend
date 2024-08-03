import logo from "@assets/img/logo.png";
import { ZUBRONOK } from "@constants";

function AdminPanelLogo() {
  return (
    <div className="admin-panel__logo">
      <a href={ZUBRONOK} target="_blank" rel="noreferrer">
        <img src={logo} alt="" />
      </a>
    </div>
  );
}

export default AdminPanelLogo;
