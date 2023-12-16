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
  image: string;
  brands: string[];
}