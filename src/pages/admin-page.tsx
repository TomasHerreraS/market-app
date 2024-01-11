import { useState } from "react";
import AdminGrid from "../components/admin/admin-grid";
import Footer from "../components/footer/footer";
import NavigationBar from "../components/navigation-bar/navigation-bar";

const AdminPage = () => {
  document.title = "Admin | Quantum Halo";
  const [isAdmin, setAdmin] = useState(true);
  return (
    <>
      <NavigationBar />
      {isAdmin ? (
        <AdminGrid />
      ) : (
        <h2 className="text-center">Not An Admin User</h2>
      )}
      <Footer />
    </>
  );
};

export default AdminPage;
