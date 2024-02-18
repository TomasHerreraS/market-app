import FavoritesGrid from "../components/favorites/favorites-grid";
import Footer from "../components/footer/footer";
import NavigationBar from "../components/navigation-bar/navigation-bar";

const FavoritesPage = () => {
  document.title = "Favorites | Quantum Halo"
  return (
    <>
      <NavigationBar />
      <FavoritesGrid />
      <Footer />
    </>
  );
};

export default FavoritesPage;
