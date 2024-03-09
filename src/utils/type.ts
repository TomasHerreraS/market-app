export interface UserData{
  firstname: string,
  lastname: string,
  rol_id: number,
  email: string,
  password: string,
  phone: string,
  state: string,
  city: string,
  address: string
}

export interface SignInData{
  email: string,
  password: string,
  keeplogged: boolean
}

export interface Email{
  email: string
}

// Products interface
export interface Products{
  product_id: number;
  name: string;
  cpu: string;
  price: number;
  category: string[];
  description: string;
  quantity: number;
  discount: number;
  image: string[];
  brand: string[];
  sold: number;
  date: string;
}

// For all the product filters
export interface Filters{
  filterPrice: number[];
  sort?: string;
  cpu?: string;
  category?: string[];
  inStock?: boolean;
  brand?: string[];
}

export interface Users {
  name: string;
  address: string;
  role: string;
  email: string;
  date: Date;
  userId: number;
  phone: number;
}


export interface ProductData {
  product_id: number;
  name: string;
  date: Date;
  quantity: number;
  description: string;
  discount: string;
  price: string;
  favorite: boolean;
  image: Buffer;
}

export interface ProductId{
  product_id: number;
}
export interface Quantity{
  product_id: number;
  quantity: number;
}

export interface Table {
  // data: Products[], LLAMAR A PRODUCT CUANDO EL TYPE ESTÉ CORRECTO.
  data: any,
  setGetItemsPerPage: React.Dispatch<React.SetStateAction<number>>,
  setGetCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setGetIndexOfFirstItem: React.Dispatch<React.SetStateAction<number>>,
  dataLength: number,
  image: boolean,
  updateButton: boolean,
  deleteButton: boolean,
}