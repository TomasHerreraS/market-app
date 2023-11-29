import useWindowDimensions from "../../utils/screen-size";
import NavigationBarMobile from "./navigation-bar-mobile/navigation-bar-mobile";
import NavigationBarPc from "./navigation-bar-pc/navigation-bar-pc";

const NavigationBar = () => {
  const windowDimensions = useWindowDimensions();

  return (
    <>
      {
        windowDimensions > 1000 ?
        <NavigationBarPc />:
        <NavigationBarMobile/>
      }
    </>
  )
}

export default NavigationBar;