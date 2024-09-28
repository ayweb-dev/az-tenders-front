import React, { useEffect, useState } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
const Darkmode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [element.classList, theme]);

  return (
    <>
      {theme === "dark" ? (
        <BiSolidSun
          className="text-2xl cursor-pointer transition-all"
          onClick={() => setTheme("light")}
        />
      ) : (
        <BiSolidMoon
          className="text-2xl cursor-pointer transition-all"
          onClick={() => setTheme("dark")}
        />
      )}
    </>
  );
};

export default Darkmode;
