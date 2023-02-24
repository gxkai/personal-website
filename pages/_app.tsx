import React from "react";
import { ToastContainer } from "react-toastify";
import "./app.css";
import "./form.css";
import "./codehighlight.css";
import "react-toastify/dist/ReactToastify.min.css";
import Sidenav from "../lib/components/Sidenav";
import UserContext, { getUser } from "../lib/contexts/UserContext";
import type { User, Profile } from "@prisma/client";

export default function Application({ Component, pageProps }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getUser().then(data => {
      if (!data) return setLoading(false);
      const { user, profile } = data;
      setUser(user);
      setProfile(profile);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  return (
    <UserContext.Provider value={{ user, profile }}>
      <div>
        <Sidenav />
        <div className="ml-16">
          <Component {...pageProps} />
        </div>
      </div>
      <ToastContainer />
    </UserContext.Provider>
  );
}
