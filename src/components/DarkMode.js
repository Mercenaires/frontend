import React, { useState, useEffect } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";

const DarkMode = () => {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;

    // Appliquer le mode sombre ou clair au HTML
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    // Stocker le thème dans le localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="text-2xl focus:outline-none transition duration-300 ease-in-out"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <BiSolidMoon className="text-blue-500" />
      ) : (
        <BiSolidSun className="text-yellow-500" />
      )}
    </button>
  );
};

export default DarkMode;