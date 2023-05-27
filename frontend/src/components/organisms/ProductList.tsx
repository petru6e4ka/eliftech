import { Grid } from "../atoms";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      <Grid item xs={12} md={6} lg={4} xl={2}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={2}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={2}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={2}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={2}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={2}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={2}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={2}>
        <ProductCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={2}>
        <ProductCard />
      </Grid>
    </Grid>
  );
};

export default ProductList;
