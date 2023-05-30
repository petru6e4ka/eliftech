import { useCallback } from "react";
import { AsideWith } from "../../components/templates";
import { CartForm, CartItem } from "../../components/organisms";
import { Box, Typography, Button } from "../../components/atoms";
import { useAppDispatch } from "../../store";
import { createOrder } from "../../store/order";
import { useOrderSelector } from "../../store/order";
import { useUserSelector } from "../../store/user";
import { IProduct } from "../../constants/types";

export const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const { products, shop_id } = useOrderSelector();
  const user = useUserSelector();

  const hasUser = Object.values(user).every((value: string) => !!value);
  const totalPrice = products.reduce((prev: number, current: IProduct) => {
    const qty = current.quantity ? current.quantity : 1;

    return prev + current.price * qty;
  }, 0);
  const isValid = hasUser && !!shop_id && products.length > 0;

  const onSubmit = useCallback(() => {
    dispatch(createOrder());
  }, [dispatch]);

  return (
    <AsideWith>
      <CartForm />
      <Box sx={{ px: 3 }}>
        {products.length > 0 &&
          products.map((product) => (
            <CartItem
              key={product.title}
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
              quantity={product.quantity}
            />
          ))}
        <Box
          sx={{
            maxWidth: 500,
            mb: 4,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="button" component="p" sx={{ py: 2, mr: 2 }}>
            {products.length > 0 && `Total Price: ${totalPrice} UAH`}
          </Typography>
          {isValid && (
            <Button variant="contained" onClick={onSubmit}>
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </AsideWith>
  );
};

export default ShoppingCart;
