import React from "react";
import useTheme from "../hooks/useTheme";
import Link from "next/link";
import AuthModal from "./AuthModal";
import UserContext from "../contexts/UserContext";

const Sidenav: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const [isAuthModalOpen, setAuthModalOpen] = React.useState(false);
  const { user } = React.useContext(UserContext);

  return (
    <React.Fragment>
      <nav className="fixed top-0 left-0 h-screen w-16 m-0 p-0 flex flex-col bg-[#efefef] dark:bg-[#333333] shadow-lg">
        <SidenavItem
          //Home
          href="/"
          tooltip="Home"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          }
        />
        <hr className="border-t border-gray-300 dark:border-gray-800 mt-1 w-[80%] mx-auto" />
        <SidenavItem
          //Projects
          href="/projects"
          tooltip="Projects"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <SidenavItem
          //Blog
          href="/blog"
          tooltip="Blog"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          }
        />
        <SidenavItem
          //Courses
          href="/courses"
          tooltip="Courses"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          }
        />
        <SidenavItem
          // Login / Register
          className="mt-auto"
          tooltip={user ? user.email : "Login / Register"}
          onClick={!user ? () => setAuthModalOpen(true) : undefined}
          href={user ? "/me" : undefined}
          icon={
            user ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )
          }
        />
        <SidenavItem
          tooltip="Change theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          icon={
            theme === "dark" ? (
              // Sun
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // Moon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )
          }
        />
      </nav>
      <AuthModal
        onCancel={() => setAuthModalOpen(false)}
        onDone={() => window.location.reload()}
        show={isAuthModalOpen}
      />
    </React.Fragment>
  );
};

const SidenavItem: React.FC<{
  icon: JSX.Element;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  tooltip: string;
}> = ({ icon, className = "", href, onClick = undefined, tooltip }) => {
  const el = (
    <a
      className={
        "relative flex items-center justify-center h-12 w-12 m-2 bg-[#ccc] text-black dark:bg-[#212121] dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white rounded-3xl hover:rounded-xl cursor-pointer !transition-all !duration-500 group " +
        className
      }
      href={href}
      role={href ? "link" : "button"}
      onClick={onClick}
    >
      {icon}
      <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md bg-[#ccc] text-black dark:bg-[#212121] dark:text-white text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
        {tooltip}
      </span>
    </a>
  );
  return href && !href.startsWith("http") ? <Link href={href}>{el}</Link> : el;
};

export default Sidenav;
