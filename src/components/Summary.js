import React, { useEffect, useState } from "react";

import axios from "axios";

const Summary = () => {

  const [allHoldings, setAllHoldings] =
    useState([]);

  const [user, setUser] =
    useState(null);

  // FETCH USER

  useEffect(() => {

    axios.get(

      "http://localhost:5000/verify",

      {
        withCredentials: true,
      }

    )

    .then((res) => {

      setUser(res.data.user);

    })

    .catch((err) => {

      console.log(err);

    });

  }, []);

  // FETCH HOLDINGS

  useEffect(() => {

    axios.get(

      "http://localhost:5000/allHoldings",

      {
        withCredentials: true,
      }

    )

    .then((res) => {

      setAllHoldings(res.data);

    })

    .catch((err) => {

      console.log(err);

    });

  }, []);

  // TOTAL INVESTMENT

  const totalInvestment =
    allHoldings.reduce(

      (acc, stock) =>

        acc + (stock.avg * stock.qty),

      0

    );

  // CURRENT VALUE

  const currentValue =
    allHoldings.reduce(

      (acc, stock) =>

        acc + (stock.price * stock.qty),

      0

    );

  // P&L

  const pnl =
    currentValue - totalInvestment;

  // P&L PERCENT

  const pnlPercent =
    totalInvestment > 0

      ?

      (
        (
          pnl / totalInvestment
        ) * 100
      ).toFixed(2)

      :

      0;

  return (

    <>

      <div className="username">

        <h6>

          Hi,

          {

            user?.username

            ?

            user.username.charAt(0)
            .toUpperCase()

            +

            user.username.slice(1)

            :

            "User"

          }!

        </h6>

        <hr className="divider" />

      </div>

      <div className="section">

        <span>

          <p>Equity</p>

        </span>

        <div className="data">

          <div className="first">

            <h3>

              ₹{currentValue.toFixed(2)}

            </h3>

            <p>Margin available</p>

          </div>

          <hr />

          <div className="second">

            <p>

              Margins used

              <span> 0 </span>

            </p>

            <p>

              Opening balance

              <span>

                ₹{totalInvestment.toFixed(2)}

              </span>

            </p>

          </div>

        </div>

        <hr className="divider" />

      </div>

      <div className="section">

        <span>

          <p>

            Holdings

            ({allHoldings.length})

          </p>

        </span>

        <div className="data">

          <div className="first">

            <h3

              className={

                pnl >= 0

                ?

                "profit"

                :

                "loss"

              }

            >

              ₹{pnl.toFixed(2)}

              <small>

                {" "}

                {pnlPercent}%

              </small>

            </h3>

            <p>P&L</p>

          </div>

          <hr />

          <div className="second">

            <p>

              Current Value

              <span>

                ₹{currentValue.toFixed(2)}

              </span>

            </p>

            <p>

              Investment

              <span>

                ₹{totalInvestment.toFixed(2)}

              </span>

            </p>

          </div>

        </div>

        <hr className="divider" />

      </div>

    </>

  );

};

export default Summary;