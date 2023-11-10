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