import React, {

  useEffect,
  useState,

} from "react";

import axios from "axios";

const Orders = () => {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    axios.get(

      "http://localhost:5000/allOrders",

      {
        withCredentials: true,
      }

    )

    .then((res) => {

      setOrders(res.data);

    })

    .catch((err) => {

      console.log(err);

    });

  }, []);

  return (

    <div className="orders">

      <h3 className="title">

        Orders ({orders.length})

      </h3>

      {

        orders.length === 0

        ?

        (

          <div className="no-orders">

            <p>

              You haven't placed any
              orders today

            </p>

            <button className="btn">

              Get started

            </button>

          </div>

        )

        :

        (

          <div className="order-table">

            <table>

              <thead>

                <tr>

                  <th>Stock</th>

                  <th>Qty</th>

                  <th>Price</th>

                  <th>Mode</th>

                  <th>Time</th>

                </tr>

              </thead>

              <tbody>

                {

                  orders.map(

                    (order, index) => {

                      return (

                        <tr key={index}>

                          <td>

                            {order.name}

                          </td>

                          <td>

                            {order.qty}

                          </td>

                          <td>

                            ₹

                            {order.price.toFixed(2)}

                          </td>

                          <td

                            className={

                              order.mode === "BUY"

                              ?

                              "profit"

                              :

                              "loss"

                            }

                          >

                            {order.mode}

                          </td>

                          <td>

                            {

                              new Date(

                                order.createdAt

                              ).toLocaleString()

                            }

                          </td>

                        </tr>

                     );

                    }
                  )

                }

              </tbody>

            </table>

           </div>

        )

      }

    </div>

  );

};

export default Orders;