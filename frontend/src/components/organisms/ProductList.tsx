import { useEffect } from "react";
import { Grid, CircularProgress } from "../atoms";
import { ProductCard } from "./ProductCard";
import { useAppDispatch } from "../../store";
import { loadProducts, useProductsSelector } from "../../store/products";
import { IProduct } from "../../constants/types";

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const { error, loading, entities, shop_id } = useProductsSelector();

  useEffect(() => {
    const promise = dispatch(loadProducts(shop_id));

    return () => {
      promise.abort();
    };
  }, [dispatch, shop_id]);

  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      {loading && (
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress sx={{ my: 2 }} />
        </Grid>
      )}
      {!error &&
        !loading &&
        shop_id &&
        entities.length > 0 &&
        entities.map(({ price, title, imageUrl }: IProduct) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={title}>
            <ProductCard title={title} price={price} imageUrl={imageUrl} />
          </Grid>
        ))}
    </Grid>
  );
};

export default ProductList;
