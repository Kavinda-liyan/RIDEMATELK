import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import SideNav from "./components/SideNav";


function App() {
  return <>
   <Navigation/>
   {/* <SideNav/> */}
   <Outlet/>
  </>;
}

export default App;
