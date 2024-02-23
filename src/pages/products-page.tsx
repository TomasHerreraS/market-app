// import { Route, Routes } from "react-router-dom";
import Footer from "../components/footer/footer";
import NavigationBar from "../components/navigation-bar/navigation-bar";
import ProductGrid from "../components/products/product-grid";

const ProductsPage: React.FC = () => {
  document.title = "Products | Quantum Halo";

  return (
    <>
      <NavigationBar />
      <ProductGrid />
      <Footer />
    </>
  );
};

export default ProductsPage;
