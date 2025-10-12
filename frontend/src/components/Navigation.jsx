import {Link,useLocation} from "react-router-dom"



const Navigation = () => {
  const location=useLocation();
  return (
    <>
      <nav className="bg-none w-full h-[45px] bg-rmlk-dark_green/50 absolute">
        <div className="pl-[60px] pr-[60px] py-[8px] h-full grid grid-cols-12">
          <div className="col-span-2 flex justify-start">
            <div className="font-rmlk-secondary font-bold tracking-wider text-white flex items-center justify-center">
              {" "}
              RIDEME<span className="text-rmlk-red">LK</span>
            </div>
          </div>
          <div className="col-span-8 flex justify-center items-center">
            <ul className="navs flex gap-[32px] text-[12px] font-extralight">
              <li className={`nav-link flex items-center `}>
               <Link to={"/"} className={`text-white tracking-widest hover:text ${location.pathname==='/'?'active':''}`}>Home</Link>
              </li>
              <li className="nav-link flex items-center">
               <Link to={"/recommendations"} className="text-white tracking-widest">Recommendations</Link>
              </li>
              <li className="nav-link flex items-center">
               <Link className="text-white tracking-widest">About Us</Link>
              </li>
              <li className="nav-link flex items-center">
               <Link className="text-white tracking-widest">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 flex justify-end">

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
