import { AsideWith } from "../../components/templates";
import { CartForm, CartItem } from "../../components/organisms";
import { Box, Typography, Button } from "../../components/atoms";

export const ShoppingCart = () => {
  return (
    <AsideWith>
      <CartForm />
      <Box sx={{ px: 3 }}>
        <CartItem />
        <CartItem />
        <Box
          sx={{
            maxWidth: 500,
            mb: 4,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="button" component="p" sx={{ py: 2, mr: 2 }}>
            Total Price: 100$
          </Typography>
          <Button variant="contained">Submit</Button>
        </Box>
      </Box>
    </AsideWith>
  );
};

export default ShoppingCart;
