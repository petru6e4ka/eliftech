import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Box,
} from "../atoms";

export const CartItem = () => {
  return (
    <Card
      sx={{ maxWidth: 500, display: "flex", mb: 2, py: 3, pr: 2 }}
      component="article"
    >
      <CardMedia
        image="https://sushiicons.com.ua/image/cache/catalog/New_Roll/New_sets/salmon_set-300x300.webp"
        title="sushi"
        component="img"
        sx={{ width: 150, mx: 2 }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: 100 $
          </Typography>
        </CardContent>
        <CardActions>
          <TextField
            label="Quantity"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </CardActions>
      </Box>
    </Card>
  );
};

export default CartItem;
