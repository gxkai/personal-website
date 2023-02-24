import React from "react";
import { motion } from "framer-motion";
import joi from "joi";
import { formDataToObject } from "../lib/util";
import { toast } from "react-toastify";

const Contact: React.FC = () => {
  let [loading, setLoading] = React.useState(false);
  let [finished, setFinished] = React.useState(false);
  let form = React.useRef<HTMLFormElement>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const values = formDataToObject(new FormData(form.current));
    const { error } = joi
      .object({
        fullName: joi.string().required().max(255),
        occupation: joi.string().required().max(255),
        message: joi.string().required()
      })
      .validate(values);

    if (error) toast(<p className="font-mono">{error.message}</p>, { type: "error" });
    else {
      toast("Sending request...", { type: "info" });
      const res = await fetch("/api/contact", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(values)
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok)
        toast(<p className="font-mono">{data.message}</p>, { type: "error" });
      else setFinished(true);
    }
    setLoading(false);
  }

  return (
    <main className="bg-gray-200 text-black dark:bg-[#212121] dark:text-white p-8 min-h-screen">
      <motion.h1
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-center my-6 text-5xl"
      >
        Contact Me
      </motion.h1>
      {!finished && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.4 }}
          className="text-center mt-4 text-2xl text-gray-700 dark:text-gray-300"
        >
          Get in touch by filling out the below form
        </motion.p>
      )}

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.6 }}
        className="min-w-[350px] max-w-[1100px] w-[50%] mx-auto my-8 border border-gray-500 rounded-lg p-6 form"
        onSubmit={submit}
        ref={form}
      >
        {!finished ? (
          <React.Fragment>
            <div className="my-2">
              <label htmlFor="full-name">Full name</label>
              <input
                type="text"
                id="full-name"
                placeholder="Enter your full name"
                name="fullName"
              />
            </div>
            <div className="my-2">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                id="occupation"
                placeholder="Enter your occupation"
                name="occupation"
              />
            </div>
            <div className="my-2">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Enter a message. Markdown is supported"
                rows={7}
                name="message"
              ></textarea>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "..." : "Send a message"}
            </button>
          </React.Fragment>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.4 }}
            className="text-center mt-4 text-2xl text-gray-700 dark:text-gray-300"
          >
            I will get in touch shortly.
          </motion.p>
        )}
      </motion.form>
    </main>
  );
};

export default Contact;
