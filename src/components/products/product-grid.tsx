import { Col, Row } from "react-bootstrap";
import ProductCards from "./product-cards";
import ProductSideMenu from "./product-side-menu";
import { Products } from "../../utils/type";
import { useEffect, useState } from "react";
import ProductSkeleton from "./product-cards-skeleton";
import { getAllProducts } from "../../provider/product.provider";

const ProductGrid = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [isLoading, setLoading] = useState(true);

  const skeleton = [1, 2, 3, 4, 5, 6];

  // fetching products
  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Could Not Fetch Products", error);
      } finally{
        setLoading(false);
      }
    };

    const fetchTimeout = setTimeout(fetchData, 1000);
    return () => {
      clearTimeout(fetchTimeout);
    }

  }, []);

  const handleFilterChange = (filteredProducts: Products[]) => {
    setFilteredProducts(filteredProducts);
  };

  return (
    <Row className="g-0">
      {/* Side Menu */}
      <Col xs={3} sm={3} md={3} lg={3} xl={2} className="p-2 pt-3">
        <ProductSideMenu
          products={products}
          onFilterChange={handleFilterChange}
        />
      </Col>
      {/* Skeleton */}
      {isLoading ? (
        <>
          <Col xs={9} sm={9} md={9} lg={9} xl={10}>
            <Row className="g-0">
              {skeleton.map((skeleton) => (
                <Col
                  className="px-2 py-3"
                  key={skeleton}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={4}
                  xxl={3}
                >
                  <ProductSkeleton key={skeleton} />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <>
          {/* Product Grid */}
          <Col xs={9} sm={9} md={9} lg={9} xl={10}>
            <Row className="g-0">
              {filteredProducts.map((obj: Products) => (
                <Col
                  key={obj.product_id}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={4}
                  xxl={3}
                  className="px-2 py-3"
                >
                  <ProductCards key={obj.product_id} obj={obj} />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      )}
    </Row>
  );
};

export default ProductGrid;
