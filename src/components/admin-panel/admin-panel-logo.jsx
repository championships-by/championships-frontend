import logo from "@src/assets/img/logo.png";

function AdminPanelLogo() {
  return (
    <div className="admin-panel__logo">
      <a href="https://zubronok.by/" target="_blank" rel="noreferrer">
        <img src={logo} alt="" />
      </a>
    </div>
  );
}

export default AdminPanelLogo;
