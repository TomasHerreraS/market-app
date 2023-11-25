import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/signup-page';
import MainPage from './pages/main-page';
import AboutPage from './pages/about-page';
import CartPage from './pages/cart-page';

const RouteByComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/about-us' element={<AboutPage />} />
    </Routes>
  )
}

export default RouteByComponent;