import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { uiActions } from "./store/ui-slice";

let isInitial = true; // Places outside "App()" So it wont reset when is called again

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible); // Extracting value from slice
  const cart = useSelector((state) => state.cart); // Get cart data
  const notification = useSelector((state) => state.ui.notification); // Extracting value from slice (ui because of "index.js")

  // useEffect() => automatically run at the end when [cart] has changes
  // useEffect() => cannot use async (but a function inside can)
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending ...",
          message: "Sending cart data",
        })
      );
      const response = await fetch(
        "https://react-http-58740-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart), // send/convert data to JSON
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart Data failed");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully",
        })
      );
    };

    // Preventing useEffect() to run for the first load
    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart Data failed",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
