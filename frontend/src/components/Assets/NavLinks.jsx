import { Link, useLocation } from "react-router-dom";

const NavLinks = ({ path, navlink }) => {
  const location = useLocation();
  return (
    <>
      <li className={`nav-link flex items-center `}>
        <Link
          to={`${path}`}
          className={`text-white tracking-widest hover:text ${
            location.pathname === `${path}` ? "active" : ""
          }`}
        >
          {navlink}
        </Link>
      </li>
    </>
  );
};

export default NavLinks;
