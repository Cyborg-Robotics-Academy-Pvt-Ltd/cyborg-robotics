import React, { useEffect, useState } from "react";

const Loader = () => {
  // const [theme, setTheme] = useState(() => {
  //   // Set initial theme based on system preference
  //   return window.matchMedia("(prefers-color-scheme: dark)").matches
  //     ? "dark"
  //     : "light";
  // });

  // useEffect(() => {
  //   const handleThemeChange = (e: MediaQueryListEvent) => {
  //     setTheme(e.matches ? "dark" : "light");
  //   };

  //   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  //   mediaQuery.addEventListener("change", handleThemeChange);

  //   return () => {
  //     mediaQuery.removeEventListener("change", handleThemeChange);
  //   };
  // }, []);

  return (
    <div
      className={`flex justify-center items-center h-screen w-screen`}
    >
      <div className="boxes">
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
