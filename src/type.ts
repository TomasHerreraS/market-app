export interface UserData{
  name: string,
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