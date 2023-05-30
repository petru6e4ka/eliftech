import { useCallback, FC, useMemo, useState, ChangeEventHandler } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Box,
  IconButton,
  DeleteOutline,
} from "../atoms";
import { useActions } from "../../hooks";
import { IProduct } from "../../constants/types";

export const CartItem: FC<IProduct> = ({
  title,
  imageUrl,
  price,
  quantity,
}) => {
  const _quantity = useMemo(() => quantity, [quantity]);

  const [qty, setQty] = useState(_quantity);

  const { changeQantityInOrder, deleteProductFromOrder } = useActions();

  const onChange: ChangeEventHandler = useCallback(
    async (e) => {
      const { value } = e.target as HTMLInputElement;
      const number = Number(value);

      setQty(number);

      if (number > 0) {
        changeQantityInOrder({ title, quantity: number });
      }
    },
    [changeQantityInOrder, title]
  );

  const onDelete = useCallback(() => {
    deleteProductFromOrder(title);
  }, [deleteProductFromOrder, title]);

  return (
    <Card
      sx={{ maxWidth: 500, display: "flex", mb: 2, py: 3, pr: 2 }}
      component="article"
    >
      <CardMedia
        image={imageUrl}
        title={title}
        component="img"
        sx={{ width: 150, mx: 2 }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Price: ${price} $`}
          </Typography>
        </CardContent>
        <CardActions>
          <TextField
            label="Quantity"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={qty}
            onChange={onChange}
          />
          <IconButton aria-label="delete" sx={{ ml: 2 }} onClick={onDelete}>
            <DeleteOutline />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CartItem;
