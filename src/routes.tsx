import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/signup-page';
import MainPage from './pages/main-page';
import AboutPage from './pages/about-page';
import FavoritesPage from './pages/favorites-page';

const RouteByComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/about-us' element={<AboutPage />} />
      <Route path='/favorites' element={<FavoritesPage />} />
    </Routes>
  )
}

export default RouteByComponent;