function AdminPanelControls(props) {
  const { children } = props;

  return (
    <div className="admin-panel__controls admin-panel__controls--right">
      {children}
    </div>
  );
}

export default AdminPanelControls;
