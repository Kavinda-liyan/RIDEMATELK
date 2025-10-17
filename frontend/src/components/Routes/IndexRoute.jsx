import { useSelector } from "react-redux";
import AdminRoute from "./AdminRoute";
import Home from "../../pages/Home/Home";
import Dashboard from "../../pages/Admin/Dashboard";

const IndexRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo && userInfo.isAdmin) {
    return (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    );
  } else {
    return <Home />;
  }
};

export default IndexRoute;
