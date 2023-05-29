import { useEffect, useCallback } from "react";
import {
  Typography,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  RamenDiningOutlined,
  LocalPizzaOutlined,
  LunchDiningOutlined,
  CircularProgress,
} from "../atoms";
import { loadShops, useShopsSelector } from "../../store/shop";
import { useProductsSelector } from "../../store/products";
import { useAppDispatch } from "../../store";
import { IShop } from "../../constants/types";
import { useActions } from "../../hooks";

export const ShopList = () => {
  const dispatch = useAppDispatch();
  const { error, loading, entities } = useShopsSelector();
  const { shop_id } = useProductsSelector();
  const { setShopId } = useActions();

  useEffect(() => {
    const promise = dispatch(loadShops());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const listItemClickHandler = useCallback(
    (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, shop_id: string) => {
      setShopId(shop_id);
    },
    [setShopId]
  );

  return (
    <>
      <Typography variant="h5" component="h2" sx={{ py: 2 }}>
        Shops:
      </Typography>
      {loading && <CircularProgress />}
      <List sx={{ minWidth: 200 }}>
        {entities.length > 0 &&
          !loading &&
          !error &&
          entities.map((shop: IShop, index: number) => (
            <ListItem disablePadding key={shop._id}>
              <ListItemAvatar>
                <Avatar>
                  {shop.type === "asian" && <RamenDiningOutlined />}
                  {shop.type === "fastfood" && <LunchDiningOutlined />}
                  {shop.type === "italian" && <LocalPizzaOutlined />}
                </Avatar>
              </ListItemAvatar>
              <ListItemButton
                component="button"
                selected={shop_id === shop._id}
                onClick={(e) => listItemClickHandler(e, shop._id)}
              >
                <ListItemText primary={shop.title} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default ShopList;
