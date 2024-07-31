import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";
const CART_URL = process.env.REACT_APP_CART_URL;
export function sendCartData(cartData) {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Pending",
        message: "Sending...",
      })
    );
    try {
      const response = await fetch(CART_URL, {
        method: "PUT",
        body: JSON.stringify({
          items: cartData.items || [],
          totalItems: cartData.totalItems,
        }),
      });
      if (!response.ok) {
        throw new Error("failed to send Cart data!");
      }
      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "Success",
          message: "cart data sends successfully! ",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };
}

export function fetchCartData() {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(CART_URL);
      if (!response.ok) {
        throw new Error("failed to fetch cart data!!!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };
}
