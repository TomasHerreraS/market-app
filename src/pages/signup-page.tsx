import Footer from "../components/footer/footer";
import NavigationBar from "../components/navigation-bar/navigation-bar-pc/navigation-bar-pc";
import SignUp from "../components/sign-up/sign-up";

const SignUpPage = () => {
  return (
    <>
      <NavigationBar role={0} />
      <SignUp/>
      <Footer />
    </>
  )
}

export default SignUpPage;