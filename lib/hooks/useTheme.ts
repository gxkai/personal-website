import React from "react";

export default function useTheme() {
  const [theme, setTheme] = React.useState<"dark" | "light">(null);
  React.useEffect(() => {
    const themeFromLS = localStorage.getItem("theme");
    if (!themeFromLS) {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(dark ? "dark" : "light");
    } else if (themeFromLS === "dark") {
      setTheme("dark");
    } else setTheme("light");
  }, []);

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", theme);
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return {
    theme,
    setTheme
  };
}
