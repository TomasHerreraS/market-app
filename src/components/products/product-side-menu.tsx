import { useEffect, useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import "../../styles/product-side-menu.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Products } from "../../utils/type";
import filterPrice from "../../utils/market-functions/filter-price";
import { useLocation } from "react-router-dom";

interface ProductSideMenuProps {
  products: Products[];
  onFilterChange: (filteredProducts: Products[]) => void;
}

const ProductSideMenu: React.FC<ProductSideMenuProps> = ({
  products,
  onFilterChange,
}) => {
  // States to show submenus
  const [showPrice, setPrice] = useState(true);
  const [showSort, setSort] = useState(true);
  const [showCategory, setCategory] = useState(true);
  const [showBrand, setBrand] = useState(true);
  const [showCPU, setCPU] = useState(true);
  const [showStock, setStock] = useState(true);

  // URL Params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const priceParam = searchParams.get("price");
  const sortParam = searchParams.get("sort");
  const brandsParam = searchParams.get("brands");
  const cpuParams = searchParams.get("cpu");
  const categoryParam = searchParams.get("category");
  let stockParam = searchParams.get("stock");

  // URL Queries
  const [priceURL, setPriceURL] = useState<string>();
  const [cpuURL, setCpuURL] = useState<string[]>([]);
  const [sortURL, setSortURL] = useState<string>();
  const [brandsURL, setBrandsURL] = useState<string[]>([]);
  const [categoryURL, setCategoryURL] = useState<string[]>([]);
  const [stockURL, setStockURL] = useState(false);

  // Handles for queries
  const handlePriceURL = (price: string) => {
    setPriceURL(price);
  };

  const handleSortURL = (sort: string) => {
    setSortURL(sort);
  };

  const handleStockURL = () => {
    setStockURL(!stockURL);
  };

  const handleCpuURL = (cpu: string) => {
    setCpuURL((prev) => {
      const updatedCpuURL = prev.includes(cpu)
        ? prev.filter((prevCPU) => prevCPU !== cpu)
        : [...prev, cpu];

      return updatedCpuURL;
    });
  };

  const handleCategoryURL = (category: string) => {
    setCategoryURL((prev) => {
      const updatedCategoryURL = prev.includes(category)
        ? prev.filter((prevCategory) => prevCategory !== category)
        : [...prev, category];

      return updatedCategoryURL;
    });
  };

  const handleBrandsURL = (brands: string) => {
    setBrandsURL((prev) => {
      const updatedBrandsURL = prev.includes(brands)
        ? prev.filter((prevBrands) => prevBrands !== brands)
        : [...prev, brands];

      return updatedBrandsURL;
    });
  };

  // This function changes the url name and navigates you to the new page
  // causing the products to be filtered depending on the url.
  const applyFilters = () => {
    const cpuQuery = cpuURL?.length > 0 ? "cpu=" + cpuURL.join("%20") : "";
    const categoryQuery =
      categoryURL?.length > 0 ? "category=" + categoryURL.join("%20") : "";
    const brandsQuery =
      brandsURL?.length > 0 ? "brands=" + brandsURL.join("%20") : "";
    const sortQuery = sortURL !== null ? "sort=" + sortURL : "";
    const priceQuery = priceURL !== null ? "price=" + priceURL : "";
    const stockQuery = stockURL === true ? "stock=Available" : "";

    const url = `products?${[
      sortQuery,
      priceQuery,
      cpuQuery,
      brandsQuery,
      categoryQuery,
      stockQuery,
    ]
      .filter(Boolean)
      .join("&")}`;

    // Navigate depending on the filters
    window.location.href = url;
  };

  // Toggles to display options
  const handleTogglePrice = () => {
    setPrice(!showPrice);
  };

  const handleToggleSort = () => {
    setSort(!showSort);
  };

  const handleToggleCategory = () => {
    setCategory(!showCategory);
  };

  const handleToggleBrand = () => {
    setBrand(!showBrand);
  };

  const handleToggleCPU = () => {
    setCPU(!showCPU);
  };

  const handleToggleStock = () => {
    setStock(!showStock);
    stockParam = "Available";
  };

  const resetFilters = () => {
    window.location.href = "products?";
  };

  // Just for any refreshes
  useEffect(() => {
    // Price
    setPriceURL(priceParam || "All");

    // Sort
    setSortURL(sortParam || "Featured");

    // Stock
    setStockURL(stockParam === "Available" ? true : false);

    // CPU
    const updatedCpuParams = cpuParams
      ? cpuParams.split(" ").filter(Boolean)
      : [];

    setCpuURL(updatedCpuParams);

    // Brands
    const updatedBrandsParams = brandsParam
      ? brandsParam.split(" ").filter(Boolean)
      : [];

    setBrandsURL(updatedBrandsParams);

    // Category
    const updatedCategoryParams = categoryParam
      ? categoryParam.split(" ").filter(Boolean)
      : [];

    setCategoryURL(updatedCategoryParams);
  }, []);

  // Filtering the products
  useEffect(() => {
    const updatedFilteredProducts = products.filter((product) => {
      let priceFilter = true;

      const cpuFilter =
        !cpuParams ||
        cpuParams.length === 0 ||
        cpuParams.toLowerCase().includes(product.cpu.toLowerCase());

      const categoryFilter =
        !categoryParam ||
        categoryParam.length === 0 ||
        product.category.some((category) =>
          categoryParam.toLowerCase().includes(category.toLowerCase())
        );

      const brandsFilter =
        !brandsParam ||
        brandsParam.length === 0 ||
        product.brands.some((brands) =>
          brandsParam.toLowerCase().includes(brands.toLowerCase())
        );

      if (priceParam !== "All" && priceParam) {
        const [minPrice, maxPrice] = priceParam.split("-").map(Number);
        priceFilter = filterPrice(
          minPrice,
          maxPrice,
          product.price - product.discount
        );
      } else {
        priceFilter = true;
      }

      const stockFilter = stockParam === "Available" ? product.inStock : true;

      // Check if all conditions are true
      return (
        cpuFilter &&
        priceFilter &&
        categoryFilter &&
        brandsFilter &&
        stockFilter
      );
    });

    // We then sort the products depending on the sort option
    const sortedProducts = [...updatedFilteredProducts];
    if (sortParam === "Newest") {
      sortedProducts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      onFilterChange(sortedProducts);
    } else if (sortParam === "Best_Sellers") {
      sortedProducts.sort((a, b) => b.sold - a.sold);
      onFilterChange(sortedProducts);
    } else if (sortParam === "Featured") {
      onFilterChange(sortedProducts);
    } else if (sortParam === "Oldest") {
      sortedProducts.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      onFilterChange(sortedProducts);
    } else {
      onFilterChange(updatedFilteredProducts);
    }
  }, [products]);

  return (
    <>
      <Row className="g-0">
        <Col xs={'auto'} className="d-flex mx-auto">
          <Button
            size="sm"
            className="filter-buttons mb-2"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </Col>
        <Col xs={'auto'} className="d-flex mx-auto">
          <Button
            size="sm"
            className="filter-buttons mb-2"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </Col>
      </Row>
      <hr />

      {/* Stock Filter */}
      <div
        style={{ width: "100%" }}
        className={`d-flex justify-content-between ${
          showStock ? "open" : "closed"
        }`}
        onClick={handleToggleStock}
      >
        <h5 className="mx-2 option-text">Stock</h5>
          <ChevronDown className="dropdown-chevron" />
      </div>
      <hr />
      {showStock && (
        <>
          <Form className="menu-options">
            <Form.Check
              className="form-text"
              label="Show Only in Stock"
              name="Stock"
              onChange={() => handleStockURL()}
              defaultChecked={stockParam === "Available"}
            />
          </Form>
          <hr />
        </>
      )}
      {/* Price Filter */}
      <div
        style={{ width: "100%" }}
        className={`d-flex justify-content-between ${
          showPrice ? "open" : "closed"
        }`}
        onClick={handleTogglePrice}
      >
        <h5 className="mx-2 option-text">Price</h5>
          <ChevronDown className="dropdown-chevron" />
      </div>
      <hr />
      {showPrice && (
        <>
          <Form className="menu-options">
            <Form.Check
              className="form-text"
              type="radio"
              name="price"
              label="All Prices"
              onChange={() => handlePriceURL("All")}
              defaultChecked={priceParam === "All" || priceParam === null}
            />
            <Form.Check
              className="form-text"
              type="radio"
              name="price"
              label="Under $100"
              onChange={() => handlePriceURL("0-100")}
              defaultChecked={priceParam === "0-100"}
            />
            <Form.Check
              className="form-text"
              type="radio"
              name="price"
              label="$100 - $200"
              onChange={() => handlePriceURL("100-200")}
              defaultChecked={priceParam === "100-200"}
            />
            <Form.Check
              className="form-text"
              type="radio"
              name="price"
              label="$200 - $300"
              onChange={() => handlePriceURL("200-300")}
              defaultChecked={priceParam === "200-300"}
            />
          </Form>
          <hr />
        </>
      )}

      {/* The Sort Option */}
      <div
        style={{ width: "100%" }}
        className={`d-flex justify-content-between ${
          showSort ? "open" : "closed"
        }`}
        onClick={handleToggleSort}
      >
        <h5 className="mx-2 option-text">Sort</h5>
          <ChevronDown className="dropdown-chevron" />
      </div>
      <hr />
      {showSort && (
        <>
          <Form className="menu-options">
            <Form.Check
              className="form-text"
              type="radio"
              name="sort"
              label="Featured"
              onChange={() => handleSortURL("Featured")}
              defaultChecked={sortParam === "Featured" || sortParam === null}
            />
            <Form.Check
              className="form-text"
              type="radio"
              name="sort"
              label="Newest"
              onChange={() => handleSortURL("Newest")}
              defaultChecked={sortParam === "Newest"}
            />
            <Form.Check
              className="form-text"
              type="radio"
              name="sort"
              label="Oldest"
              onChange={() => handleSortURL("Oldest")}
              defaultChecked={sortParam === "Oldest"}
            />
            <Form.Check
              className="form-text"
              type="radio"
              name="sort"
              label="Best Sellers"
              onChange={() => handleSortURL("Best_Sellers")}
              defaultChecked={sortParam === "Best_Sellers"}
            />
          </Form>
          <hr />
        </>
      )}

      {/* The Categories Option*/}
      <div
        style={{ width: "100%" }}
        className={`d-flex justify-content-between ${
          showCategory ? "open" : "closed"
        }`}
        onClick={handleToggleCategory}
      >
        <h5 className="mx-2 option-text">Categories</h5>
          <ChevronDown className="dropdown-chevron" />
      </div>
      <hr />
      {showCategory && (
        <>
          <Form className="menu-options">
            <Form.Check
              className="form-text"
              label="PC Cases"
              onClick={() => handleCategoryURL("PC_Case")}
              defaultChecked={categoryParam?.toLowerCase().includes("pc_case")}
            />
            <Form.Check
              className="form-text"
              label="GPU"
              onClick={() => handleCategoryURL("GPU")}
              defaultChecked={categoryParam?.toLowerCase().includes("gpu")}
            />
            <Form.Check
              className="form-text"
              label="CPU"
              onClick={() => handleCategoryURL("CPU")}
              defaultChecked={categoryParam?.toLowerCase().includes("cpu")}
            />
            <Form.Check
              className="form-text"
              label="Mouse"
              onClick={() => handleCategoryURL("Mouse")}
              defaultChecked={categoryParam?.toLowerCase().includes("mouse")}
            />
          </Form>
          <hr />
        </>
      )}

      {/* Brand Options */}
      <div
        style={{ width: "100%" }}
        className={`d-flex justify-content-between ${
          showBrand ? "open" : "closed"
        }`}
        onClick={handleToggleBrand}
      >
        <h5 className="mx-2 option-text">Brands</h5>
          <ChevronDown className="dropdown-chevron" />
      </div>
      <hr />
      {showBrand && (
        <>
          <Form className="menu-options">
            <Form.Check
              className="form-text"
              label="MSI"
              onClick={() => handleBrandsURL("MSI")}
              defaultChecked={brandsParam?.toLowerCase().includes("msi")}
            />
            <Form.Check
              className="form-text"
              label="ASUS"
              onClick={() => handleBrandsURL("ASUS")}
              defaultChecked={brandsParam?.toLowerCase().includes("asus")}
            />
            <Form.Check
              className="form-text"
              label="EVGA"
              onClick={() => handleBrandsURL("EVGA")}
              defaultChecked={brandsParam?.toLowerCase().includes("evga")}
            />
            <Form.Check
              className="form-text"
              label="Intel"
              onClick={() => handleBrandsURL("Intel")}
              defaultChecked={brandsParam?.toLowerCase().includes("intel")}
            />
            <Form.Check
              className="form-text"
              label="Corsair"
              onClick={() => handleBrandsURL("Corsair")}
              defaultChecked={brandsParam?.toLowerCase().includes("corsair")}
            />
          </Form>
          <hr />
        </>
      )}

      {/* CPU Options */}
      <div
        style={{ width: "100%" }}
        className={`d-flex justify-content-between ${
          showCPU ? "open" : "closed"
        }`}
        onClick={handleToggleCPU}
      >
        <h5 className="mx-2 option-text">CPU</h5>
          <ChevronDown className="dropdown-chevron" />
      </div>
      <hr />
      {showCPU && (
        <>
          <Form className="menu-options">
            <Form.Check
              className="form-text"
              label="13th Gen"
              onClick={() => handleCpuURL("13th_Gen")}
              defaultChecked={cpuParams?.toLowerCase().includes("13th_gen")}
            />
            <Form.Check
              className="form-text"
              label="12th Gen"
              onClick={() => handleCpuURL("12th_Gen")}
              defaultChecked={cpuParams?.toLowerCase().includes("12th_gen")}
            />
            <Form.Check
              className="form-text"
              label="11th Gen"
              onClick={() => handleCpuURL("11th_Gen")}
              defaultChecked={cpuParams?.toLowerCase().includes("11th_gen")}
            />
            <Form.Check
              className="form-text"
              label="10th Gen"
              onClick={() => handleCpuURL("10th_Gen")}
              defaultChecked={cpuParams?.toLowerCase().includes("10th_gen")}
            />
            <Form.Check
              label="9th Gen"
              onClick={() => handleCpuURL("9th_Gen")}
              defaultChecked={cpuParams?.toLowerCase().includes("9th_gen")}
            />
          </Form>
          <hr />
        </>
      )}
    </>
  );
};

export default ProductSideMenu;
