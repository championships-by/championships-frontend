import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserSelector } from "@/store/users";
import Loader from "@/components/loader/Loader";

function ProtectedRoute({ allowedRoles, children }) {
  const user = useSelector(getUserSelector);

  if ((!user || !user.data) && user.isLoading) {
    return <Loader show />;
  }

  if (user.data) {
    if (!user?.data?.role) {
      return <Navigate to="/401" />;
    }

    if (!allowedRoles.includes(user?.data?.role)) {
      return <Navigate to="/403" />;
    }

    return children;
  }
  if (!user.isLoading) {
    return <Navigate to="/401" />;
  }
}

export default ProtectedRoute;
