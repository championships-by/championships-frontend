function AdminPanelControls(props) {
  return (
    <div className="admin-panel__controls admin-panel__controls--right">
      {props.children}
    </div>
  );
}

export default AdminPanelControls;
