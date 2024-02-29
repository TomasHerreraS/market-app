import React, { useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import ImageUploader from "../image uploader/image-uploader";
import { addProduct } from "../../provider/product.provider";

const AdminProductGrid = () => {
  const [image, setImage] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [brand, setBrand] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [brandInput, setBrandInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const handleUpload = (files: File[]) => {
    // Append the new files to the existing state
    setImage(prevImage => [...prevImage, ...files]);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      case "discount":
        setDiscount(value);
        break;
      default:
        break;
    }
  };

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (brandInput.trim() !== "") {
      setBrand(prevBrands => [...prevBrands, brandInput.trim()]);
      setBrandInput('');
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryInput.trim() !== "") {
      setCategory(prevCategories => [...prevCategories, categoryInput.trim()]);
      setCategoryInput('');
    }
  };
  
  

  const handleBrandInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandInput(e.target.value);
  };

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("discount", discount);

    brand.forEach(b => formData.append("brand[]", b));
    category.forEach(c => formData.append("category[]", c));
    
    image.forEach(file => formData.append("image", file));

    formData.forEach(file => console.log("File: ", file))
    await addProduct(formData);

    // Reset form fields
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setDiscount("");
    setBrand([]);
    setCategory([]);
    setImage([]);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter product name"
            value={name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter product description"
            value={description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Enter product price"
            value={price}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            placeholder="Enter product quantity"
            value={quantity}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDiscount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="number"
            name="discount"
            placeholder="Enter product discount"
            value={discount}
            onChange={handleInputChange}
          />
        </Form.Group>
          <Form.Group controlId="formBrand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              placeholder="Enter product brand"
              value={brandInput}
              onChange={handleBrandInputChange}
            />
            <Button onClick={handleAddBrand}>Add Brand</Button>
          </Form.Group>
        <Form.Group className="mb-2" controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            placeholder="Enter product category"
            value={categoryInput}
            onChange={handleCategoryInputChange}
          />
          <Button onClick={handleAddCategory}>Add Category</Button>
        </Form.Group>
        <ImageUploader onUpload={handleUpload} />
        <Button className="mt-2" variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AdminProductGrid;
