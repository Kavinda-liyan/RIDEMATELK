import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const NavLinks = ({ path, navlink, children }) => {
  const location = useLocation();
  return (
    <>
      <li className={`nav-link flex items-center `}>
        
        <Link
          to={`${path}`}
          className={`text-white tracking-widest hover:text p-[4px] ${
            location.pathname === `${path}` ? "active" : ""
          }`}
        >
          {children}
          {navlink}
        </Link>
      </li>
    </>
  );
};

export default NavLinks;
