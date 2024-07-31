import { uiActions } from "../../store/ui-slice";
import classes from "./CartButton.module.css";
import { useSelector, useDispatch } from "react-redux";
const CartButton = (props) => {
  const totalItems = useSelector((state) => state.cart.totalItems);
  const dispatch = useDispatch();
  const handleCartToggle = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <button className={classes.button} onClick={handleCartToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
