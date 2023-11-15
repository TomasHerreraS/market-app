import { useNavigate } from 'react-router-dom';

const useRedirectToMainPage = () => {
  const navigate = useNavigate();

  const url = () => {
    navigate('/');
  };

  return url;
};

export default useRedirectToMainPage;