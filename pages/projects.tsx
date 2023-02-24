import React from "react";
import { motion } from "framer-motion";
import projects, { Project } from "../content/projects";

const ProjectCardLanguageIcon: React.FC<{ language: Project["language"] }> = ({
  language
}) => {
  switch (language) {
    case "python":
      return (
        <svg viewBox="0 0 128 128" width="24" height="24">
          <linearGradient
            id="python-original-a"
            gradientUnits="userSpaceOnUse"
            x1="70.252"
            y1="1237.476"
            x2="170.659"
            y2="1151.089"
            gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
          >
            <stop offset="0" stopColor="#5A9FD4"></stop>
            <stop offset="1" stopColor="#306998"></stop>
          </linearGradient>
          <linearGradient
            id="python-original-b"
            gradientUnits="userSpaceOnUse"
            x1="209.474"
            y1="1098.811"
            x2="173.62"
            y2="1149.537"
            gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
          >
            <stop offset="0" stopColor="#FFD43B"></stop>
            <stop offset="1" stopColor="#FFE873"></stop>
          </linearGradient>
          <path
            fill="url(#python-original-a)"
            d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
            transform="translate(0 10.26)"
          ></path>
          <path
            fill="url(#python-original-b)"
            d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
            transform="translate(0 10.26)"
          ></path>
          <radialGradient
            id="python-original-c"
            cx="1825.678"
            cy="444.45"
            r="26.743"
            gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#B8B8B8" stopOpacity=".498"></stop>
            <stop offset="1" stopColor="#7F7F7F" stopOpacity="0"></stop>
          </radialGradient>
          <path
            opacity=".444"
            fill="url(#python-original-c)"
            d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416 0-3.544 14.815-6.417 33.092-6.417 18.275 0 33.091 2.872 33.091 6.417z"
          ></path>
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 128 128" width="24" height="24">
          <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"></path>
          <path
            fill="#323330"
            d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"
          ></path>
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 128 128" width="24" height="24">
          <path
            fill="#0074BD"
            d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"
          ></path>
          <path
            fill="#EA2D2E"
            d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"
          ></path>
          <path
            fill="#0074BD"
            d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"
          ></path>
          <path
            fill="#EA2D2E"
            d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"
          ></path>
          <path
            fill="#0074BD"
            d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"
          ></path>
        </svg>
      );
  }
};

const ProjectCard: React.FC<{ project: Project; delay: number }> = ({
  project,
  delay
}) => {
  return (
    <motion.article
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: delay }}
      className="px-4 py-2 rounded border border-gray-300 bg-white text-black dark:border-gray-700 dark:bg-[#333333] dark:text-white"
    >
      <motion.h3
        className="text-2xl font-bold"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: delay + 0.5 }}
      >
        {project.name}
      </motion.h3>
      <motion.p
        className="text-opacity-80"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: delay + 0.55 }}
      >
        {project.description}
      </motion.p>
      <div className="flex items-center justify-end gap-4 py-2">
        {project.language && (
          <span className="mr-auto flex gap-4 items-center">
            {Array.isArray(project.language) ? (
              project.language.map((lang, i) => (
                <ProjectCardLanguageIcon language={lang} key={i} />
              ))
            ) : (
              <ProjectCardLanguageIcon language={project.language} />
            )}
          </span>
        )}
        {project.link && (
          <a href={project.link} className="text-blue-500 hover:text-blue-600" target={'_blank'} rel="noreferrer">
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
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </a>
        )}
        {project.source && (
          <a href={project.source} className="text-blue-500 hover:text-blue-600" target={'_blank'} rel="noreferrer">
            {project.sourceType === "github" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="rgba(59, 130, 246, 1)"
              >
                <path
                  fillRule="evenodd"
                  d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 012.496-.336 9.554 9.554 0 012.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
            {project.sourceType === "gitlab" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ msFilter: "" }}
                fill="rgba(59, 130, 246, 1)"
              >
                <path d="M20.892 9.889a.664.664 0 00-.025-.087l-2.104-6.479a.84.84 0 00-.8-.57.822.822 0 00-.789.575l-2.006 6.175H8.834L6.826 3.327a.823.823 0 00-.786-.575h-.006a.837.837 0 00-.795.575L3.133 9.815c0 .005-.005.01-.007.016l-1.067 3.281a1.195 1.195 0 00.435 1.34l9.227 6.706c.167.121.393.12.558-.003l9.229-6.703a1.2 1.2 0 00.435-1.34l-1.051-3.223zM17.97 3.936l1.809 5.566H16.16l1.81-5.566zm-11.94 0l1.812 5.566H4.228L6.03 3.936zm-2.982 9.752a.253.253 0 01-.093-.284l.793-2.437 5.817 7.456-6.517-4.735zm1.499-3.239h3.601l2.573 7.916-6.174-7.916zm7.452 8.794l-2.856-8.798h5.718l-1.792 5.515-1.07 3.283zm1.282-.877l2.467-7.588.106-.329h3.604l-5.586 7.156-.591.761zm7.671-4.678l-6.519 4.733.022-.029 5.794-7.425.792 2.436a.25.25 0 01-.089.285z"></path>
              </svg>
            )}
          </a>
        )}
      </div>
    </motion.article>
  );
};

const Projects: React.FC = () => {
  return (
    <main className="bg-gray-200 text-black dark:bg-[#212121] dark:text-white p-8 min-h-screen">
      <motion.h1
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-center my-6 text-5xl"
      >
        My projects
      </motion.h1>
      <div className="mt-8 flex flex-col gap-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} delay={index / 4} />
        ))}
      </div>
    </main>
  );
};

export default Projects;
