import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page';
import AboutPage from './pages/about-page';
import CartPage from './pages/cart-page';
import { decodedToken } from './utils/token';
import { getEmailLoggedIn } from './provider/user.provider';

const RouteByComponent = () => {
  if (decodedToken) {
    getEmailLoggedIn({email: decodedToken.email}).then((result)=>{
      console.log(result);
    });
  }
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/about-us' element={<AboutPage />} />
    </Routes>
  )
}

export default RouteByComponent;