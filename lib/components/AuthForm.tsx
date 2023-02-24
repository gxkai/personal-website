import React from "react";
import { formDataToObject } from "../util";
import joi from "joi";
import { toast } from "react-toastify";
import qs from "qs";
import { motion } from "framer-motion";
import Link from "next/link";

const AuthForm: React.FC<{ onDone?: () => void; onCancel?: () => void }> = ({
  onDone,
  onCancel
}) => {
  const [loading, setLoading] = React.useState(false);
  const [hasSentEmail, setSentEmail] = React.useState(false);
  const form = React.useRef<HTMLFormElement>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    if (hasSentEmail) checkEmailCode();
    else loginWithEmail();
  }

  async function loginWithEmail() {
    setLoading(true);
    const values = formDataToObject(new FormData(form.current));

    const { error } = joi
      .object({
        email: joi.string().email({ tlds: false }).required()
      })
      .validate(values);

    if (error) toast(<p className="font-mono">{error.message}</p>, { type: "error" });
    else {
      toast("Sending an email", { type: "info" });
      try {
        const res = await fetch("/api/auth/email?" + qs.stringify(values));
        if (!res.ok) {
          const data = await res.json();
          toast(data.message, { type: "error" });
        } else {
          toast("Check your email for a verification link", { type: "success" });
          setSentEmail(true);
          form.current.reset();
        }
      } catch (error) {
        toast(<p className="font-mono">{error.message}</p>, { type: "error" });
      }
    }
    setLoading(false);
  }

  async function checkEmailCode() {
    setLoading(true);
    const values = formDataToObject(new FormData(form.current));

    const { error } = joi
      .object({
        code: joi.string().required()
      })
      .validate(values);

    if (error) toast(<p className="font-mono">{error.message}</p>, { type: "error" });
    else {
      toast("Logging you in...", { type: "info" });
      try {
        const res = await fetch("/api/auth/session?token=" + values.code);
        const data = await res.json();
        if (!res.ok) {
          toast(data.message, { type: "error" });
        } else {
          toast("Successfully logged in", { type: "success" });
          onDone?.();
        }
      } catch (error) {
        toast(<p className="font-mono">{error.message}</p>, { type: "error" });
      }
    }
    setLoading(false);
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      ref={form}
      className="min-w-[250px] max-w-[1100px] w-[40%] mx-auto my-8 border rounded-lg p-6 form bg-[#eee] text-black border-gray-500 dark:bg-[#333] dark:text-white dark:border-gray-700"
      onSubmit={submit}
    >
      <div className="my-2">
        <h2 className="text-center text-3xl my-4 font-bold">Authenticate with Email</h2>
        {!hasSentEmail ? (
          <React.Fragment>
            <div className="my-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                name="email"
              />
            </div>
            <p className="flex gap-2 items-center">
              <button
                className="px-4 py-2 bg-gray-500 text-black w-full mt-4 rounded-md border border-black cursor-pointer"
                type="button"
                onClick={() => {
                  form.current.reset();
                  setSentEmail(false);
                  setLoading(false);
                  onCancel?.();
                }}
              >
                Cancel
              </button>
              <button type="submit" disabled={loading}>
                ✉️ Send me an email!
              </button>
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="my-2">
              <label htmlFor="email-code">Enter code</label>
              <input type="text" id="email-code" name="code" placeholder="XXXXXX" />
            </div>
            <p className="flex gap-2 items-center">
              <button
                className="px-4 py-2 bg-gray-500 text-black w-full mt-4 rounded-md border border-black cursor-pointer"
                onClick={() => {
                  form.current.reset();
                  setSentEmail(false);
                  setLoading(false);
                  onCancel?.();
                }}
              >
                Cancel
              </button>
              <button type="submit" disabled={loading}>
                Sign in
              </button>
            </p>
          </React.Fragment>
        )}

        <h2 className="text-center text-3xl mt-10 mb-4 font-bold">
          Authenticate with OAuth
        </h2>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Link href="/api/auth/github">
            <a className="bg-[#181717] text-white w-full px-4 py-2 rounded-md border border-transparent text-center hover:brightness-110 transition-all duration-500">
              Login with Github
            </a>
          </Link>
        </div>
      </div>
    </motion.form>
  );
};

export default AuthForm;
