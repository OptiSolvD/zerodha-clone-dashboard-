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

    "http://localhost:5000/verify",

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
        "http://localhost:3000/signup";

    }

  })

  .catch((err) => {

    console.log(err);

    window.location.href =
      "http://localhost:3000/signup";

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
