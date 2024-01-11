import { useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import "../../styles/product-side-menu.css";
import { Form } from "react-bootstrap";
import Range from "../../utils/market-functions/range";

export interface Filters {
  price: number[];
  sort: string;
  category: string[];
  brands: string[];
  cpu: string[];
}

interface ProductSideMenuProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const ProductSideMenu: React.FC<ProductSideMenuProps> = ({
  filters,
  setFilters,
}) => {
  // States to show submenus
  const [showPrice, setPrice] = useState(true);
  const [showSort, setSort] = useState(true);
  const [showCategory, setCategory] = useState(true);
  const [showBrand, setBrand] = useState(true);
  const [showCPU, setCPU] = useState(true);

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

  // Generic filter that takes any filter typer and the selected option.
  // CAN ONLY BE USED FOR FILTERS THAT ONLY ALLOW FOR ONE SELECTION
  const selectSingleFilter = (
    filterType: keyof Filters,
    selectedFilter: any
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedFilter,
    }));
  };

  // Generic filter that takes the filter type and the selected option.
  // CAN ONLY BE USED FOR FILTERS THAT ALLOW MULTIPLE SELECTIONS
  const selectMultiFilter = (
    filterType: keyof Filters,
    selectedFilter: string
  ) => {
    setFilters((prevFilters) => {
      // Checks if the selected filter was already selected. There are also null checks.
      const isSelected = (prevFilters?.[filterType] as string[])?.includes(
        selectedFilter
      );

      return {
        ...prevFilters,
        [filterType]: isSelected
          ? (prevFilters[filterType] as string[]).filter(
              (currentFilter: string) => currentFilter !== selectedFilter
            )
          : [...(prevFilters[filterType] as string[]), selectedFilter],
      };
    });
  };

  return (
    <>
      {/* Price Filter */}
      <div
        style={{ width: "100%" }}
        className={`d-flex justify-content-between ${
          showPrice ? "open" : "closed"
        }`}
        onClick={handleTogglePrice}
      >
        <div>Price</div>
        <div>
          <ChevronDown />
        </div>
      </div>
      <hr />
      {showPrice && (
        <>
          <Form className="menu-options">
            <Form.Check
              type="radio"
              name="price"
              label="Under $100"
              onChange={() => selectSingleFilter("price", Range(0, 99))}
            />
            <Form.Check
              type="radio"
              name="price"
              label="$100 - $200"
              onChange={() => selectSingleFilter("price", Range(100, 200))}
            />
            <Form.Check
              type="radio"
              name="price"
              label="$200 - $300"
              onChange={() => selectSingleFilter("price", Range(200, 300))}
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
        <div>Sort</div>
        <div>
          <ChevronDown />
        </div>
      </div>
      <hr />
      {showSort && (
        <>
          <Form className="menu-options">
            <Form.Check
              label="Newest"
              onChange={() => selectSingleFilter("sort", "Newest")}
            />
            <Form.Check
              label="Best Sellers"
              onChange={() => selectSingleFilter("sort", "Best Sellers")}
            />
            <Form.Check
              label="Featured"
              onChange={() => selectSingleFilter("sort", "Featured")}
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
        <div>Category</div>
        <div>
          <ChevronDown />
        </div>
      </div>
      <hr />
      {showCategory && (
        <>
          <Form className="menu-options">
            <Form.Check
              label="PC Cases"
              onClick={() => selectMultiFilter("category", "PC Case")}
            />
            <Form.Check
              label="GPU"
              onClick={() => selectMultiFilter("category", "gpu")}
            />
            <Form.Check
              label="CPU"
              onClick={() => selectMultiFilter("category", "cpu")}
            />
            <Form.Check label="Mouse" />
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
        <div>Brand</div>
        <div>
          <ChevronDown />
        </div>
      </div>
      <hr />
      {showBrand && (
        <>
          <Form className="menu-options">
            <Form.Check label="MSI" onClick={() => selectMultiFilter('brands', 'msi')}/>
            <Form.Check label="ASUS" onClick={() => selectMultiFilter('brands', 'asus')}/>
            <Form.Check label="EVGA" onClick={() => selectMultiFilter('brands', 'evga')}/>
            <Form.Check label="Intel" onClick={() => selectMultiFilter('brands', 'intel')} />
            <Form.Check label="Corsair" onClick={() => selectMultiFilter('brands', 'corsair')} />
          </Form>
          <hr />
        </>
      )}

      {/* CPU Options */}
      <div
        style={{ width: "100%" }}
        className={`d-flex justify-content-between ${
          showBrand ? "open" : "closed"
        }`}
        onClick={handleToggleCPU}
      >
        <div>CPU</div>
        <div>
          <ChevronDown />
        </div>
      </div>
      <hr />
      {showCPU && (
        <>
          <Form className="menu-options">
            <Form.Check label="13th Gen" onClick={() => selectMultiFilter('cpu', '13th gen')}/>
            <Form.Check label="12th Gen" onClick={() => selectMultiFilter('cpu', '12th gen')}/>
            <Form.Check label="11th Gen" onClick={() => selectMultiFilter('cpu', '11th gen')}/>
            <Form.Check label="10th Gen" onClick={() => selectMultiFilter('cpu', '10th gen')}/>
            <Form.Check label="9th Gen" onClick={() => selectMultiFilter('cpu', '9th gen')}/>
          </Form>
          <hr />
        </>
      )}
    </>
  );
};

export default ProductSideMenu;
