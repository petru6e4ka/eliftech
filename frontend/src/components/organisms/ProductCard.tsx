import { FC } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "../atoms";
import { IProduct } from "../../constants/types";

export const ProductCard: FC<IProduct> = ({ title, price, imageUrl }) => {
  return (
    <Card sx={{ maxWidth: 300 }} component="article">
      <CardMedia
        sx={{ height: 140 }}
        image={imageUrl}
        title={title}
        component="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Price: ${price} UAH`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Add To Cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
