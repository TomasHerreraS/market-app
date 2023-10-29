import React, {useState} from 'react'
import { Row, Col } from "react-bootstrap";
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
import '../../styles/navigation-bar.css';
import Peripherals from './peripheral';


const NavigationBar = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(false)
  const [showSignUp, setShowSignUp] = useState<boolean>(false)

  return (
    <Row className="background-color text-color padding">
      <Col md={1}>
        <Peripherals/>
      </Col>
      <Col md={{ span: 1, offset: 5}}>
        <h6
          className='cursor-pointer h6-margin'
          onClick={()=>{
            setShowSignUp(true);
          }}>
          Sign up
        </h6>
        <SignUp show={showSignUp} setShow={setShowSignUp} />
      </Col>
      <Col md={1}>
        <h6
          className='cursor-pointer h6-margin'
          onClick={()=>{
            setShowSignIn(true);
          }}>
          Sign in
        </h6>
        <SignIn show={showSignIn} setShow={setShowSignIn}/>
      </Col>
    </Row>
  )
}

export default NavigationBar;