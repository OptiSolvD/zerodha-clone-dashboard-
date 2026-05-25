import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  useEffect(() => {

  axios.get(

    "https://zerodha-clone-server-r4uq.onrender.com/verify",

    {
      withCredentials: true,
    }

  )

  .then((res) => {

    const { status, user } = res.data;

    if (status) {

      setUser(user);

      setLoading(false);

    } else {

      window.location.href =
        "https://zerodha-clone-landing-c3vz.vercel.app/signup";

    }

  })

  .catch((err) => {

    console.log(err);

    window.location.href =
      "https://zerodha-clone-landing-c3vz.vercel.app/signup";

  });

}, []);

  if (loading) {

    return <h1>Loading...</h1>;

  }

  return (
    <>

      <TopBar user={user} />

      <Dashboard />

    </>
  );
};
export default Home;
