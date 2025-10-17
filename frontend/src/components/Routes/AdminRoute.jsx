import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo && userInfo.isAdmin) {
    return children;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export default AdminRoute;
