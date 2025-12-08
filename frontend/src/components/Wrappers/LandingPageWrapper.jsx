const LandingPageWrapper = ({ id, extraClass, children }) => {
  return (
    <section
      id={id}
      className={`h-dvh pl-[60px] pr-[60px] relative max-sm-rmlk:px-[24px] ${extraClass} bg-rmlk-dark pt-[50px]`}
    >
      {children}
    </section>
  );
};

export default LandingPageWrapper;
