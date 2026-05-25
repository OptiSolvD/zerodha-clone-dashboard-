import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";


const BuyActionWindow = ({ uid, price }) => {
  const generalContext =
  useContext(GeneralContext);   
  const [stockQuantity, setStockQuantity] = useState(1);
  

  const handleBuyClick = async () => {

  try {

    await axios.post(

      "http://localhost:5000/newOrder",

      {

        name: uid,

        qty: Number(stockQuantity),

        price: Number(price),

        mode: "BUY",

      },

      {

        withCredentials: true,

      }

    );

    generalContext.closeBuyWindow();

    window.location.reload();

  } catch (error) {

    console.log(error);

    alert(

      error.response?.data?.message ||

      "Something went wrong"

    );

  }

};
  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
  <legend>Calculated Result</legend>

  <div id="price">
    Total Amount: ₹{(stockQuantity * price).toFixed(2)}
  </div>
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
