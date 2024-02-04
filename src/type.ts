export interface userData{
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

export interface signInData{
  email: string,
  password: string,
  keeplogged: boolean
}

export interface email{
  email: string
}