import React from "react";
import { returnUserFromSession } from "../lib/session";
import { GetServerSideProps } from "next";
import { Profile, User } from ".prisma/client";
import { formDataToObject } from "../lib/util";
import joi from "joi";
import { toast } from "react-toastify";

export const getServerSideProps: GetServerSideProps = async context => {
  const toReturn = (await returnUserFromSession(context)) as any;
  if (!toReturn.props.user) return { redirect: { destination: "/auth" } };
  return toReturn;
};

const Me: React.FC<{ user: User; profile: Profile; session: Record<string, any> }> = ({
  user,
  profile
}) => {
  const [loading, setLoading] = React.useState(false);
  const profileForm = React.useRef<HTMLFormElement>();
  const accountForm = React.useRef<HTMLFormElement>();

  async function editProfile(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const values = formDataToObject(new FormData(profileForm.current));
    const { error } = joi
      .object({
        full_name: joi.string().allow(""),
        website: joi.string().allow(""),
        bio: joi.string().allow(""),
        occupation: joi.string().allow("")
      })
      .validate(values);

    if (error) toast(<p className="font-mono">{error.message}</p>, { type: "error" });
    else {
      toast("Updating your profile...", { type: "info" });
      const res = await fetch("/api/auth/me/profile", {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(values)
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok)
        toast(<p className="font-mono">{data.message}</p>, { type: "error" });
      else toast("Updated your profile!", { type: "success" });
    }
    setLoading(false);
  }

  async function editAccount(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const values = formDataToObject(new FormData(accountForm.current));
    const { error } = joi
      .object({
        email: joi.string().email({ tlds: false }).required()
      })
      .validate(values);

    if (error) toast(<p className="font-mono">{error.message}</p>, { type: "error" });
    else {
      toast("Updating your account...", { type: "info" });
      const res = await fetch("/api/auth/me", {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(values)
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        toast(<p className="font-mono">{data.message}</p>, { type: "error" });
      } else {
        toast("Updated your account!", { type: "success" });
        window.location.reload();
      }
    }
    setLoading(false);
  }

  return (
    <main className="bg-gray-200 text-black dark:bg-[#212121] dark:text-white p-8 min-h-screen">
      <h2 className="text-4xl font-bold my-4">Your profile</h2>
      <form className="m-4 form" onSubmit={editProfile} ref={profileForm}>
        <div className="my-2">
          <label htmlFor="full-name">Full name</label>
          <input
            type="text"
            id="full-name"
            placeholder="Enter your full name"
            name="full_name"
            defaultValue={profile.full_name}
          />
        </div>
        <div className="my-2">
          <label htmlFor="occupation">Occupation</label>
          <input
            type="text"
            id="occupation"
            placeholder="Enter your occupation"
            name="occupation"
            defaultValue={profile.occupation}
          />
        </div>
        <div className="my-2">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            placeholder="Enter your website URL (along with https://)"
            name="website"
            defaultValue={profile.website}
          />
        </div>
        <div className="my-2">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            placeholder="Write a few things about you"
            rows={3}
            name="bio"
            defaultValue={profile.bio}
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "..." : "Update profile"}
        </button>
      </form>

      <h2 className="text-4xl font-bold mt-8 mb-4">Your account ({user.email})</h2>
      <form className="m-4 form" onSubmit={editAccount} ref={accountForm}>
        <div className="my-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            defaultValue={user.email}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "..." : "Update account"}
        </button>
      </form>

      <h2 className="text-4xl font-bold mt-8 mb-4">Logout</h2>
      <button
        className="m-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-transparent text-lg rounded-md"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          await fetch("/api/auth/session", { method: "DELETE" });
          window.location.href = "/";
        }}
      >
        {loading ? "..." : "Logout"}
      </button>
    </main>
  );
};

export default Me;
