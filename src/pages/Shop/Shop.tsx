// components
import ShopProducts from "components/ShopProducts/ShopProducts";
import PageTemplate from "components/PageTemplate/PageTemplate";

// consts
import { products } from "pages/Shop/consts";

// styles
import "./Shop.scss";

export default function Shop() {
  return (
    <PageTemplate title="Shop" className="Shop">
      <ShopProducts products={products} />
    </PageTemplate>
  );
}
