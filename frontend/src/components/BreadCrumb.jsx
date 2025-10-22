import { Link } from "react-router-dom";

const BreadCrumb = ({ links }) => {
  return (
    <nav className="flex flex-row text-white font-rmlk-secondary my-[8px] text-[14px] items-center bg-rmlk-dark-light p-[8px] rounded-md shadow-md">
      <p className="">Admin</p> <span className="px-[4px]">/</span>
      {links.map((link, index) => (
        <span key={index}>
          {link.to ? (
            <Link to={link.to} className="px-[2px] hover:underline text-[12px] ">
              {link.label}
            </Link>
          ) : (
            <span className="px-[2px] font-medium">{link.label}</span>
          )}
          {index < links.length - 1 && <span className="px-[4px]">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default BreadCrumb;
