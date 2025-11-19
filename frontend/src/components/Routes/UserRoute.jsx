import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo) {
    return children;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export default UserRoute;
