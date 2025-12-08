import { useEffect, useState } from "react";

const HomeNavigation = () => {
  const [activeSection, setActiveSection] = useState("#Home");
  const sections = [
    { id: "#Home" },
    { id: "#Specifications" },
    { id: "#Aboutus" },
  ];

  const handleDotClick = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let current = "#Home";
      sections.forEach(({ id }) => {
        const section = document.querySelector(id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="fixed right-0 h-auto w-auto bg-rmlk-dark/40 top-[50%] transform  translate-y-[-60%] rounded-tl-xl rounded-bl-xl px-[4px] transition-all z-50">
      <div className="flex w-full items-center justify-center gap-[8px] p-[8px] flex-col">
        {sections.map(({ id }) => (
          <button
            className="hover:cursor-pointer"
            key={id}
            onClick={() => handleDotClick(id)}
          >
            <div
              className={`w-[10px] h-[10px]  rounded-full ${
                activeSection === id
                  ? "bg-rmlk-red scale-110 duration-200 ease-in-out "
                  : "bg-rmlk-dark-lighter scale-90 duration-200 ease-in-out"
              }`}
            >
              {" "}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeNavigation;
