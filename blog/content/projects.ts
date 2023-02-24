export interface Project {
  name: string;
  description: string;
  link?: string;
  image?: string;
  source?: string;
  sourceType?: "github" | "gitlab";
  language?: "python" | "javascript" | "java";
}

export default [
  {
    name: "interview",
    description: "Interview website",
    link: "https://guxukai.tech/interview",
    source: "https://github.com/turboyjs/ycode",
    sourceType: "github",
    language: "javascript"
  },
] as Project[];
