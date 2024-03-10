import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page';
import AboutPage from './pages/about-page';
import CartPage from './pages/cart-page';
import FavoritesPage from './pages/favorites-page';
import ProductsPage from './pages/products-page';
import ProductDetailsPage from './pages/product-details-page';
import AdminPage from './pages/admin-page';
import UsersPage from './pages/users-page';
import { decodedToken } from './utils/token';
import { getRole } from './provider/user.provider';
import SignUpPage from './pages/signup-page';
import AdminProductsPage from './pages/admin-products-page';

const RouteByComponent = () => {
  if (decodedToken) {
    getRole({email: decodedToken.email}).then((result)=>{
      console.log(result);
    });
  }
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/about-us' element={<AboutPage />} />
      <Route path='/favorites' element={<FavoritesPage />} />
      <Route path='/products/*' element={<ProductsPage />} />
      <Route path='/products/:id' element={<ProductDetailsPage />}/>
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/admin/products' element={<AdminProductsPage />} />
      <Route path='/admin/users' element={<UsersPage />} />
    </Routes>
  )
}

export default RouteByComponent;