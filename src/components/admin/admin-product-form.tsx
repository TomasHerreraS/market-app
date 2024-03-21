import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Dropdown, Form, InputGroup } from "react-bootstrap";
import ImageUploader from "../image uploader/image-uploader";
import { addProduct } from "../../provider/product.provider";
import * as yup from "yup";
import "../../styles/admin-product-form.css";
import { X } from "react-bootstrap-icons";

const AdminProductForm = () => {
  const [image, setImage] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [discount, setDiscount] = useState<number>();
  const [brand, setBrand] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [brandInput, setBrandInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]); // State to store validation errors
  const [imageError, setImageError] = useState<string>("");
  const [brandOptions, setBrandOptions] = useState<string[]>([
    "Corsair",
    "Intel",
    "Dell",
    "Nvidia",
    "Asus",
  ]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([
    "Mouse",
    "Pc",
    "Component",
    "Monitor",
  ]);
  const [showBrand, setShowBrand] = useState<boolean>(false);
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const brandInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);

  // Define the schema using yup
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is a required field")
      .min(3, "Name must be at least 3 characters long"),
    description: yup
      .string()
      .min(60, "Description must be at least 60 characters long")
      .max(300, "Description is up to 300 characters long")
      .required("Description is a required field"),
    price: yup
      .number()
      .min(0.01, "Price must be greater than 0")
      .required("Price is a required field"),
    quantity: yup
      .number()
      .positive("Quantity must be greater than 0")
      .integer("Quantity must be a whole number")
      .required("Quantity is a required field"),
    discount: yup.number(),
    brand: yup.array().min(1, "Please add at least one brand"),
    category: yup.array().min(1, "Please add at least one category"),
  });

  useEffect(() => {
    const handleClickBrand = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        brandInputRef.current &&
        !brandInputRef.current.contains(e.target as Node) &&
        target.getAttribute('name') !== 'brand'
      ) {
        setShowBrand(false);
      }
    };

    document.addEventListener("mousedown", handleClickBrand);

    return () => {
      document.removeEventListener("mousedown", handleClickBrand);
    };
  }, []);

  useEffect(() => {
    const handleClickCategory = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        categoryInputRef.current &&
        !categoryInputRef.current.contains(e.target as Node) &&
        target.getAttribute('name') !== 'category'
        ) {
        setShowCategory(false);
      }
    };

    document.addEventListener("mousedown", handleClickCategory);

    return () => {
      document.removeEventListener("mousedown", handleClickCategory);
    };
  }, []);

  useEffect(() => {
    if (brandInput.length > 0) {
      setShowBrand(true);
    } else if (brandInput.length! < 0) {
      setShowBrand(false);
    }
  }, [brandInput]);

  useEffect(() => {
    if (categoryInput.length > 0) {
      setShowCategory(true);
    } else if (categoryInput.length! < 0) {
      setShowCategory(false);
    }
  }, [categoryInput]);

  const handleUpload = (files: File[]) => {
    setImage((prevImage) => [...prevImage, ...files]);
  };

  const handleDeleteImage = (index: number) => {
    setImage((prevImage) => prevImage.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        if (description.length <= 300) {
          setDescription(value);
        }
        break;
      case "price":
        let prevPrice = value.replace(/\D/g, '');
        const priceNotZero = prevPrice !== "000" && prevPrice !== "00";

        if(prevPrice.startsWith("00") && priceNotZero){
          prevPrice = prevPrice.slice(2)
        } else if(prevPrice.startsWith("0") && priceNotZero){
          prevPrice = prevPrice.slice(1)
        }

        if(prevPrice.length >= 3){
          let formattedValue = `${prevPrice.slice(0, -2)}.${prevPrice.slice(-2)}`
          setPrice(parseFloat(formattedValue))
        } else if(prevPrice.length === 2){
          const formattedValue = `0.${prevPrice.slice(-2)}`
          setPrice(parseFloat(formattedValue));
        } else {
          const formattedValue = `0.0${prevPrice.slice(-1)}`
          setPrice(parseFloat(formattedValue))
        }
        break;
      case "quantity":
        setQuantity(parseInt(value));
        break;
      case "discount":
        let prevDiscount = value.replace(/\D/g, '');
        const discountNotZero = prevDiscount !== "000" && prevDiscount !== "00";

        if(prevDiscount.startsWith("00") && discountNotZero){
          prevDiscount = prevDiscount.slice(2)
        } else if(prevDiscount.startsWith("0") && discountNotZero){
          prevDiscount = prevDiscount.slice(1)
        }

        if(prevDiscount.length >= 3){
          let formattedValue = `${prevDiscount.slice(0, -2)}.${prevDiscount.slice(-2)}`
          setPrice(parseFloat(formattedValue))
        } else if(prevDiscount.length === 2){
          const formattedValue = `0.${prevDiscount.slice(-2)}`
          setPrice(parseFloat(formattedValue));
        } else {
          const formattedValue = `0.0${prevDiscount.slice(-1)}`
          setPrice(parseFloat(formattedValue))
        }
        break;
      default:
        break;
    }
  };

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();

    const value =
      brandInput.trim().charAt(0).toUpperCase() +
      brandInput.trim().slice(1).toLowerCase();

    if (brandInput !== "" && !brand.includes(value)) {
      setBrand((prevBrands) => [...prevBrands, value]);
      setBrandInput("");
    }
  };

  const handleAddOption = (type: string, value: string) => {
    if (type === "Brand") {
      if (!brand.includes(value)) {
        setBrand((prevBrand) => [...prevBrand, value]);
        setShowBrand(false);
      }
    }

    if (type === "Category") {
      if (!category.includes(value)) {
        setCategory((prevCategory) => [...prevCategory, value]);
        setShowCategory(false);
      }
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();

    const value =
      categoryInput.trim().charAt(0).toUpperCase() +
      categoryInput.trim().slice(1).toLowerCase();

    if (categoryInput.trim() !== "" && !category.includes(value)) {
      setCategory((prevCategories) => [...prevCategories, value]);
      setCategoryInput("");
    }
  };

  const handleBrandInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandInput(e.target.value);
  };

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryInput(e.target.value);
  };

  const handleDeleteSelected = (type: string, value: string) => {
    if (type === "Brand") {
      const newBrand = brand.filter((brand) => brand !== value);
      setBrand(newBrand);
    }

    if (type === "Category") {
      const newCategory = category.filter((category) => category !== value);
      setCategory(newCategory);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(discount === null) {
      setDiscount(0);
    }

    if (image.length === 0) {
      setImageError("Must upload at least one image");
    }

    if (image.length !== 0) {
      setImageError("");
    }

    // Validate the form data against the schema
    try {
      await schema.validate(
        {
          name,
          description,
          price,
          quantity,
          discount,
          brand,
          category,
        },
        { abortEarly: false }
        ); // Abort early to collect all validation errors

      // If validation succeeds, proceed with form submission
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      if(price){
        formData.append("price", price.toString());
      }
      if(quantity) {
        formData.append("quantity", quantity.toString());
      }
      if(discount) {
        formData.append("discount", discount.toString());
      }

      brand.forEach((b) => formData.append("brand[]", b));
      category.forEach((c) => formData.append("category[]", c));
      image.forEach((file) => formData.append("image", file));

      await addProduct(formData);

      // Reset form fields
      setName("");
      setDescription("");
      setPrice(0.00);
      setQuantity(0);
      setDiscount(0);
      setBrand([]);
      setCategory([]);
      setImage([]);
      setValidationErrors([]); 
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setValidationErrors(error.errors);
      }
    }
  };

  return (
    <Container>
      <h2 className="product-form-title">Add Product Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter product name"
            value={name}
            onChange={handleInputChange}
          />
          {validationErrors
            .filter((error) => error.includes("Name"))
            .map((error, index) => (
              <p className="errors" key={index}>
                - {error}
              </p>
            ))}
        </Form.Group>
        <Form.Group controlId="formPrice" className="my-2">
          <Form.Label>Price</Form.Label>
          <InputGroup>
            <InputGroup.Text className="m-0">$</InputGroup.Text>
            <Form.Control
              type="number"
              name="price"
              placeholder="0.00"
              value={price}
              onChange={handleInputChange}
            />
          </InputGroup>
          {validationErrors
            .filter((error) => error.includes("Price"))
            .map((error, index) => (
              <p className="errors" key={index} style={{ color: "red" }}>
                - {error}
              </p>
            ))}
          <Form.Group controlId="formQuantity" className="my-2">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              placeholder="Enter product quantity"
              value={quantity}
              onChange={handleInputChange}
            />
            {validationErrors
              .filter((error) => error.includes("Quantity"))
              .map((error, index) => (
                <p className="errors" key={index}>
                  - {error}
                </p>
              ))}
          </Form.Group>
          <Form.Group controlId="formBrand" className="my-2">
            <Form.Label>Brand</Form.Label>
            <InputGroup>
              <Button
                size="sm"
                className="input-buttons"
                onClick={handleAddBrand}
              >
                Add Brand
              </Button>
              <Form.Control
                type="text"
                name="brand"
                placeholder="Enter product brand"
                value={brandInput}
                onChange={handleBrandInputChange}
                autoComplete="off"
                onClick={() => setShowBrand(true)}
              />
              {showBrand && (
                <Dropdown.Menu
                  className="product-form-dropdown"
                  ref={brandInputRef}
                  show
                >
                  {brandOptions
                    .filter((brand) =>
                      brand.toLowerCase().startsWith(brandInput.toLowerCase())
                    )
                    .map((brand, index) => (
                      <Dropdown.Item
                        onClick={() => handleAddOption("Brand", brand)}
                        key={index}
                      >
                        {brand}
                      </Dropdown.Item>
                    ))}
                  {brandOptions.filter((brand) =>
                    brand.toLowerCase().startsWith(brandInput.toLowerCase())
                  ).length === 0 && (
                    <Dropdown.Item disabled>No reuslts found</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              )}
            </InputGroup>
            <Container className="d-flex p-0">
              {brand.map((brand) => (
                <div className="selected-options d-flex">
                  {brand}
                  <X
                    size={20}
                    className="delete-option"
                    onClick={() => handleDeleteSelected("Brand", brand)}
                  />
                </div>
              ))}
            </Container>
            {validationErrors
              .filter((error) => error.includes("brand"))
              .map((error, index) => (
                <p className="errors" key={index} style={{ color: "red" }}>
                  - {error}
                </p>
              ))}
          </Form.Group>
          <Form.Group controlId="formCategory" className="my-2">
            <Form.Label>Category</Form.Label>
            <InputGroup>
              <Button
                size="sm"
                className="input-buttons"
                onClick={handleAddCategory}
              >
                Add Category
              </Button>
              <Form.Control
                type="text"
                name="category"
                placeholder="Enter product category"
                value={categoryInput}
                onChange={handleCategoryInputChange}
                autoComplete="off"
                onClick={() => setShowCategory(true)}
              />
              {showCategory && (
                <Dropdown.Menu
                  className="product-form-dropdown"
                  ref={categoryInputRef}
                  show
                >
                  {categoryOptions
                    .filter((category) =>
                      category
                        .toLowerCase()
                        .startsWith(categoryInput.toLowerCase())
                    )
                    .map((category, index) => (
                      <Dropdown.Item
                        onClick={() => handleAddOption("Category", category)}
                        key={index}
                      >
                        {category}
                      </Dropdown.Item>
                    ))}
                  {categoryOptions.filter((category) =>
                    category
                      .toLowerCase()
                      .startsWith(categoryInput.toLowerCase())
                  ).length === 0 && (
                    <Dropdown.Item disabled>No options found</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              )}
            </InputGroup>
            <Container className="d-flex p-0">
              {category.map((category) => (
                <div className="selected-options d-flex">
                  {category}
                  <X
                    size={20}
                    className="delete-option"
                    onClick={() => handleDeleteSelected("Category", category)}
                  />
                </div>
              ))}
            </Container>
            {validationErrors
              .filter((error) => error.includes("category"))
              .map((error, index) => (
                <p className="errors" key={index} style={{ color: "red" }}>
                  - {error}
                </p>
              ))}
          </Form.Group>
          <Form.Group controlId="formDiscount" className="my-2">
            <Form.Label>Discount</Form.Label>
            <InputGroup>
              <InputGroup.Text className="m-0">%</InputGroup.Text>
              <Form.Control
                type="number"
                name="discount"
                placeholder="0.00"
                value={discount}
                onChange={handleInputChange}
              />
            </InputGroup>
            {validationErrors
              .filter((error) => error.includes("Discount"))
              .map((error, index) => (
                <p className="errors" key={index} style={{ color: "red" }}>
                  - {error}
                </p>
              ))}
          </Form.Group>
        </Form.Group>
        <Form.Group className="mt-2 mb-4" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="description"
            placeholder="Enter product description"
            value={description}
            onChange={handleInputChange}
            style={{ height: "100px" }}
          />
          {description.length >= 300 && (
            <p className="errors">- Description is up to 300 characters long</p>
          )}
          {validationErrors
            .filter((error) => error.includes("Description"))
            .map((error, index) =>
              description.length >= 300 ? (
                error.includes("300") && null
              ) : (
                <p className="errors" key={index} style={{ color: "red" }}>
                  - {error}
                </p>
              )
            )}
        </Form.Group>
        <ImageUploader
          onUpload={handleUpload}
          files={image}
          onDelete={handleDeleteImage}
        />
        {imageError !== "" && <p className="image-error">- {imageError}</p>}
        <div className="d-flex">
          <Button
            className="add-product-button"
            variant="primary"
            type="submit"
          >
            Add Product
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminProductForm;
