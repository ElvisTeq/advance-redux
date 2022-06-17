import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible); // Extracting value from slice
  const cart = useSelector((state) => state.cart); // Get cart data

  // useEffect() => automatically run at the end when [cart] has changes
  useEffect(() => {
    fetch("https://react-http-58740-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart), // send/convert data to JSON
    });
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
