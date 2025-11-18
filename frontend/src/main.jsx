import { StrictMode } from "react";
import ReactCrop from "react-image-crop";
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
import AllVehicles from "./pages/Admin/Vehicles/AllVehicles.jsx";
import IndexRoute from "./components/Routes/IndexRoute.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AddVehicles from "./pages/Admin/Vehicles/Add/AddVehicles.jsx";
import EditVehicle from "./pages/Admin/Vehicles/Edit/EditVehicle.jsx";
import RecommendationForm from "./pages/Recommendation/RecommendationForm.jsx";
import VehicleDetails from "./pages/Recommendation/VehicleDetails.jsx";

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
      <Route path="/recommendations/result" element={<RecommendationForm />} />
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
      <Route
        path="/admin/editvehicle/:id"
        element={
          <AdminRoute>
            <EditVehicle />
          </AdminRoute>
        }
      />
      <Route
        path="recommendation/result/vehicle/:id"
        element={<VehicleDetails />}
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
