import { NextApiHandler } from "next";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import tag from "html-tag";

const handler: NextApiHandler = (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  let content = "";
  if (typeof req.body === "string") {
    content = req.body;
  } else if (typeof req.body === "object") {
    content = req.body.content;
  }

  const mdit = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return tag(
            "pre",
            { class: "hljs lang-" + lang },
            tag(
              "code",
              hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
            )
          );
        } catch (__) {}
      }
      return tag("pre", { class: "hljs lang-plain" }, tag("code", str)); // use external default escaping
    }
  });
  mdit.use(require("markdown-it-anchor"));
  mdit.use(require("markdown-it-attrs"));

  if (req.headers.accept.startsWith("text")) res.status(200).send(mdit.render(content));
  else res.status(200).json({ content: mdit.render(content) });
};

export default handler;
