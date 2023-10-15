import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/signup-page';
import MainPage from './pages/main-page';

const RouteByComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>} />
      <Route path='/sign-up' element={<SignUp/>} />
    </Routes>
  )
}

export default RouteByComponent;