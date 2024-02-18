export interface userData{
  name: string,
  lastname: string,
  rol: string,
  email: string,
  password: string,
  phone: string,
  state: string,
  city: string,
  address: string
}

export interface signIn{
  email: string,
  password: string,
  keeplogged: boolean
}

// Products interface
export interface Products{
  name: string;
  cpu: string;
  price: number;
  category: string[];
  description: string;
  id: number;
  inStock: boolean;
  discount: number;
  images: string[];
  brands: string[];
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
  brands?: string[];
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