import firstImage from '../assets/carousel-img/pc.webp';
import secondImage from '../assets/explore-products-img/product-box-row2-right.jpg';

export interface Product {
  name: string;
  id: number;
  description: string;
  image: string;
  price: number;
  discount: number;
  category: string;
  inStock: boolean;
}

const products: Product[] = [
  {id: 1, image: firstImage, name: "GPU", inStock: true, price: 100.99, category: 'component', discount: 10.99, description: 'descriptionlkfjaksdjfk;hsdflkhsakdjfhkdsafhjsfhkahdfkhskfhjkasdfjkdshfkjahjkfhdafakjjjdahfihsjkhlsjfahjksdjkfsdljkfsdjkfhjksdhjkfhlksjfhkjskdfs'},
  {id: 2, image: secondImage, name: "GPU", inStock: true, price: 100, category: 'component', discount: 0, description: 'description'},
  {id: 3, image: firstImage, name: "GPU", inStock: false, price: 100, category: 'component', discount: 20, description: 'description'},
  {id: 4, image: firstImage, name: "GPU", inStock: true, price: 100, category: 'component', discount: 0, description: 'description'},
  {id: 5, image: firstImage, name: "GPU", inStock: true, price: 100, category: 'component', discount: 0, description: 'description'},
  {id: 6, image: firstImage, name: "GPU", inStock: true, price: 100, category: 'component', discount: 0, description: 'description'},
];

export { products };

