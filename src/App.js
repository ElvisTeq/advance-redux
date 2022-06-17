import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true; // Places outside "App()" So it wont reset when is called again

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible); // Extracting value from slice
  const cart = useSelector((state) => state.cart); // Get cart data
  const notification = useSelector((state) => state.ui.notification); // Extracting value from slice (ui because of "index.js")

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    // sendCartData() => Thunk Function (To call the function in another component, so this component in cleaner)
    dispatch(sendCartData(cart));
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
