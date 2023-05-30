import { ProductList, ShopList } from "../../components/organisms";
import { AsideWith } from "../../components/templates";

export const Home = () => {
  return (
    <AsideWith>
      <ShopList />
      <ProductList />
    </AsideWith>
  );
};

export default Home;
