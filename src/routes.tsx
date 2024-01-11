import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/signup-page';
import MainPage from './pages/main-page';
import AboutPage from './pages/about-page';
import CartPage from './pages/cart-page';
import FavoritesPage from './pages/favorites-page';
import ProductsPage from './pages/products-page';

const RouteByComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/about-us' element={<AboutPage />} />
      <Route path='/favorites' element={<FavoritesPage />} />
      <Route path='/products' element={<ProductsPage />} />
    </Routes>
  )
}

export default RouteByComponent;