import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigation-bar/navigation-bar';
import SignUp from './pages/signup-page';

const RouteByComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<NavigationBar/>} />
      <Route path='/sign-up' element={<SignUp/>} />
    </Routes>
  )
}

export default RouteByComponent;