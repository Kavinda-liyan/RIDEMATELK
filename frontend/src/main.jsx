import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";
import Home from "./pages/Home/Home.jsx";
import Recommendation from "./pages/Recommendation/Recommendation.jsx";
import Signin from "./pages/Auth/Signin.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import { useSelector } from "react-redux";
import AdminRoute from "./components/Routes/AdminRoute.jsx";
import AllVehicles from "./pages/Admin/AllVehicles.jsx";
import IndexRoute from "./components/Routes/IndexRoute.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AddVehicles from "./pages/Admin/AddVehicles.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<IndexRoute />}></Route>
      <Route path="/home" element={<Home />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route path="/recommendations" element={<Recommendation />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/admin/allvehicles"
        element={
          <AdminRoute>
            <AllVehicles />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/addvehicle"
        element={
          <AdminRoute>
            <AddVehicles />
          </AdminRoute>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
