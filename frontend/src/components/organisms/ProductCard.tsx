import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "../atoms";
import { Modal, ProcessOrderModalContent } from "../molecules";
import { IProduct } from "../../constants/types";
import { useProductsSelector } from "../../store/products";
import { useOrderSelector } from "../../store/order";
import { useActions } from "../../hooks";

export const ProductCard: FC<IProduct> = ({ title, price, imageUrl }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { shop_id: currentShopId } = useProductsSelector();
  const { shop_id: cartShopId, products } = useOrderSelector();
  const { addProductToOrder, setOrderShopId, orderReset } = useActions();
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    if (!cartShopId && products.length === 0) {
      setOrderShopId(currentShopId);
      addProductToOrder({ title, price, imageUrl });
      return;
    }

    if (currentShopId === cartShopId) {
      addProductToOrder({ title, price, imageUrl });
      return;
    }

    setIsOpenDialog(true);
  }, [
    cartShopId,
    products.length,
    currentShopId,
    setOrderShopId,
    addProductToOrder,
    title,
    price,
    imageUrl,
  ]);

  const onOrderReset = useCallback(() => {
    orderReset();
    setOrderShopId(currentShopId);
    addProductToOrder({ title, price, imageUrl });
    setIsOpenDialog(false);
  }, [
    addProductToOrder,
    currentShopId,
    imageUrl,
    orderReset,
    price,
    setOrderShopId,
    title,
  ]);

  const onOrderContinue = useCallback(() => {
    navigate("/shopping-cart");
  }, [navigate]);

  const onCloseDialog = useCallback(() => {
    setIsOpenDialog(false);
  }, []);

  return (
    <>
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
          <Button variant="contained" onClick={onClick}>
            Add To Cart
          </Button>
        </CardActions>
      </Card>
      <Modal isOpen={isOpenDialog} onClose={onCloseDialog}>
        <ProcessOrderModalContent
          onRemove={onOrderReset}
          onProceed={onOrderContinue}
        ></ProcessOrderModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
