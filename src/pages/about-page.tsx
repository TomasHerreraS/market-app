import Footer from "../components/footer/footer";
import NavigationBar from "../components/navigation-bar/navigation-bar";
import "../styles/html.css";

const AboutPage = () => {
  document.title = "About Us | Quantum Halo"
  return (
    <>
      <NavigationBar />
      <h1 className="text-center">About Us</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore sint
        deserunt nulla quae porro quia. Similique numquam repellendus, pariatur,
        quod reiciendis cumque assumenda cum quas nihil iste consectetur
        mollitia dicta?
      </p>
      <Footer />
    </>
  );
};

export default AboutPage;
