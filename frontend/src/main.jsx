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
import Home from "./pages/Home/Home.jsx";
import Recommendation from "./pages/Recommendation/Recommendation.jsx";
import Signin from "./pages/Auth/Signin.jsx";
import Signup from "./pages/Auth/Signup.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<Home />}></Route>
      <Route path="/recommendations" element={<Recommendation />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
