import { Col, Row } from "react-bootstrap";
import ProductCards from "./product-cards";
import ProductSideMenu, { Filters } from "./product-side-menu";
import { useEffect, useState } from "react";
import { Products } from "../../utils/type";
import { fetchProducts } from "../../utils/api";
import arrayToLowerCase from "../../utils/market-functions/array-to-lower-case";

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [filters, setFilters] = useState<Filters>({
    price: [],
    sort: "",
    category: [],
    brands: [],
    cpu: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Could Not Fetch Products", error);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    const filteredProducts = products.filter((product) => {
      return (
        (filters.cpu.length === 0 ||
          filters.cpu.some(
            (cpu) => cpu.toLowerCase() === product.cpu.toLowerCase()
          )) &&
        (filters.category.length === 0 ||
          product.category.some(
            (category) =>
              arrayToLowerCase(filters.category).includes(
                category.toLowerCase()
              ) &&
              (filters.brands.length === 0 ||
                product.brands.some((brand) =>
                  arrayToLowerCase(filters.brands).includes(brand.toLowerCase())
                )) &&
              (filters.price.length === 0 ||
                filters.price.includes(product.price - product.discount))
          ))
      );
    });

    return filteredProducts;
  };

  return (
    <Row className="g-0">
      {/* Side Menu */}
      <Col xs={3} sm={3} md={3} lg={3} xl={2} className="p-2 pt-3">
        <ProductSideMenu filters={filters} setFilters={setFilters} />
      </Col>

      {/* Product Grid */}
      <Col xs={9} sm={9} md={9} lg={9} xl={10}>
        <Row className="g-0">
          {applyFilters().map((product) => (
            <Col
              key={product.id}
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={4}
              className="px-2 py-3"
            >
              <ProductCards key={product.id} product={product} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default ProductGrid;
