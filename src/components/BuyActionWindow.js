import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, price }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  

  const handleBuyClick = () => {
    console.log(uid);
  console.log(stockQuantity);
  console.log(price);

    axios.post("http://localhost:5000/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: (stockQuantity * price).toFixed(2),
      mode: "BUY",
    });

    GeneralContext.closeBuyWindow();
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
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
