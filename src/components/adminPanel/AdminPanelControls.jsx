function AdminPanelControls(props) {
  const { children } = children;

  return (
    <div className="admin-panel__controls admin-panel__controls--right">
      {children}
    </div>
  );
}

export default AdminPanelControls;
