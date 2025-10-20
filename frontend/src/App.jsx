import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import SideNav from "./components/SideNav";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Navigation />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex min-h-screen bg-gray-100 relative">
        {userInfo && userInfo.isAdmin && (
          <aside
            className={`transition-all duration-500 ease-in-out overflow-hidden bg-gray-800 text-white 
            w-[200px]
            `}
          >
            <SideNav />
          </aside>
        )}

        {/* Main content */}
        <main className={`flex-1 flex flex-col transition-all duration-500 `}>
          <div className="flex-grow">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
