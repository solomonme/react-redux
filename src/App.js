import React, { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Notification from "./components/UI/Notification";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "My First Book",
    description: "The first book I ever wrote",
  },
  {
    id: "p2",
    price: 5,
    title: "My Second Book",
    description: "The second book I ever wrote",
  },
];

let isInitialLoad = true;

function App() {
  const products = DUMMY_PRODUCTS;
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  useEffect(() => {
    if (isInitialLoad) {
      isInitialLoad = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart cartItems={cart.items} />}
        <Products products={products} />
      </Layout>
    </>
  );
}

export default App;
