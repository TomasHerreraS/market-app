import { useNavigate } from 'react-router-dom';

const useRedirectToMainPage = () => {
  const navigate = useNavigate();

  const url = () => {
    navigate('/');
  };

  return url;
};

const useRedirectToCart = () => {
  const navigate = useNavigate()

  const url = () => {
    navigate('/cart')
  }

  return url;
}

const exportRedirect = {
  useRedirectToMainPage,
  useRedirectToCart
}

export default exportRedirect;