import road from "../../assets/Roads.jpg";
import { useSelector } from "react-redux";

const Header_3 = () => {
  const {userInfo}=useSelector((state)=>state.auth);
  return (
    <section className={` h-dvh bg-rmlk-dark grid grid-cols-12 pl-[60px] pr-[60px] pt-[45px] pb-[45px] gap-[20px]`} id="Roadconditions">
      <div className="h-full relative col-span-6 overflow-hidden rounded-md shadow-md">
        <img
          className="object-cover w-full scale-200  absolute bottom-[0px]"
          src={road}
          alt="Road.jpg"
        />
      </div>
      <div className="h-full col-span-6">

      </div>
    </section>
  );
};

export default Header_3;
