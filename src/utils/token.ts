import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

const cookies = new Cookies();

export const signInToken = cookies.get('token'); 
export let decodedToken: any;

if (signInToken) {
  decodedToken = jwtDecode(signInToken.token);
}