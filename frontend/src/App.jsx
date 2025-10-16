import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import SideNav from "./components/SideNav";
import Footer from "./components/Footer";


function App() {
  return <>
   <Navigation/>
   {/* <SideNav/> */}
   <Outlet/>
   <Footer/>
  </>;
}

export default App;
