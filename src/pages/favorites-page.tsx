import FavoritesGrid from "../components/favorites-grid";
import Footer from "../components/footer/footer";
import NavigationBar from "../components/navigation-bar/navigation-bar";


const FavoritesPage: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <FavoritesGrid />
      <Footer />
    </>
  );
};

export default FavoritesPage;
