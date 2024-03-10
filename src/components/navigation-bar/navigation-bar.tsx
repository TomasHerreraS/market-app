import { useEffect, useState } from "react";
import useWindowDimensions from "../../utils/market-functions/screen-size";
import NavigationBarMobile from "./navigation-bar-mobile/navigation-bar-mobile";
import NavigationBarPc from "./navigation-bar-pc/navigation-bar-pc";
import { getRole } from "../../provider/user.provider";
import { decodedToken } from "../../utils/token";

const NavigationBar = () => {
  const [role, setRole] = useState<number>(0);
  const windowDimensions = useWindowDimensions();

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
      {windowDimensions > 1000 ? (
        <NavigationBarPc role={role} />
      ) : (
        <NavigationBarMobile role={role} />
      )}
    </>
  );
};

export default NavigationBar;
