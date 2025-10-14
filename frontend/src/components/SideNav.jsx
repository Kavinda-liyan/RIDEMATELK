import NavLinks from "./Assets/NavLinks";

const SideNav = () => {
  return (
    <nav>
      <div className="h-[calc(100vh-45px)] mt-[45px] w-auto bg-rmlk-dark fixed">
        <div className="flex items-center justify-center mt-5 px-10 h-full">
            <ul className="text-[12px] flex flex-col gap-[16px]">
                <NavLinks path={""} navlink={"Dashboard"}/>
                <NavLinks path={""} navlink={"Home"}/>
                <NavLinks path={""} navlink={"All Vehicles"}/>
                <NavLinks path={""} navlink={"All Users"}/>
                <NavLinks path={""} navlink={"Reviews"}/>
            </ul>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
