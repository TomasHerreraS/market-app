import { useEffect, useState } from "react";
import AdminGrid from "../components/admin/admin-grid";
import Footer from "../components/footer/footer";
import NavigationBar from "../components/navigation-bar/navigation-bar";
import { decodedToken } from "../utils/token";
import { getRole } from "../provider/user.provider";

const AdminPage = () => {
  document.title = "Admin | Quantum Halo";
  const [role, setRole] = useState<number>(0);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        if (decodedToken) {
          const role = await getRole({ email: decodedToken.email });
          if (role) {
            setRole(role.rol_id);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRole();
  }, []);

  return (

    <>
      <NavigationBar />
      {role === 1 ? (
        <AdminGrid />
      ) : (
        <h2 className="text-center">Not an admin user</h2>
      )}
      <Footer />
    </>
  );
};

export default AdminPage;
