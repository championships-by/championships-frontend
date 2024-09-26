import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserSelector } from "@store/users";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const user = useSelector(getUserSelector);

  if (user.data.length !== 0) {
    if (!user?.data?.role) {
      return <Navigate to="/401" />;
    }

    if (!allowedRoles.includes(user?.data?.role)) {
      return <Navigate to="/403" />;
    }

    return children;
  }
};

export default ProtectedRoute;
