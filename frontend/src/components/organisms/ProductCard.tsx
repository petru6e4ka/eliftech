import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "../atoms";

export const ProductCard = () => {
  return (
    <Card sx={{ maxWidth: 300 }} component="article">
      <CardMedia
        sx={{ height: 140 }}
        image="https://sushiicons.com.ua/image/cache/catalog/New_Roll/New_sets/salmon_set-300x300.webp"
        title="sushi"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: 100 $
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Add To Cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
