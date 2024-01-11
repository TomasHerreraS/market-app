import UsersGrid from "../components/admin/users-grid";
import Footer from "../components/footer/footer";
import NavigationBar from "../components/navigation-bar/navigation-bar";

const UsersPage = () => {
  document.title = "Users | Quantum Halo"
  return (
    <>
      <NavigationBar />
      <UsersGrid />
      <Footer />
    </>
  );
};

export default UsersPage;
