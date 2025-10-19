import { useSelector } from "react-redux";

const PageWrapper = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <section
      className={`min-h-[100dvh] pt-[45px] bg-rmlk-dark ${
        userInfo.isAdmin ? "pl-[30px] pr-[60px]" : "pl-[60px] pr-[60px]"
      }`}
    >
      {children}
    </section>
  );
};

export default PageWrapper;
