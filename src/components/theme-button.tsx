import React, { useState } from "react";
import { MoonStarsFill, SunFill } from "react-bootstrap-icons";

const ThemeToggleButton: React.FC = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      const currentTheme = htmlElement.getAttribute("data-bs-theme");
      htmlElement.setAttribute(
        "data-bs-theme",
        currentTheme === "dark" ? "light" : "dark"
      );
      setTheme(currentTheme === "dark" ? "light" : "dark");
    }
  };
  return theme === "light" ? (
    <MoonStarsFill size={20} className="theme-button cursor" onClick={toggleTheme} />
  ) : (
    <SunFill size={20} className="theme-button cursor" onClick={toggleTheme} />
  );
};

export default ThemeToggleButton;
