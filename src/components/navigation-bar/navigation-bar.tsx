import {useState} from 'react'
import { Row, Col, Stack } from "react-bootstrap";
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
import '../../styles/navigation-bar.css';
import Peripherals from './peripheral';
import Component from './component';
import { FaSearch } from 'react-icons/fa';

const NavigationBar = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(false)
  const [showSignUp, setShowSignUp] = useState<boolean>(false)

  return (
    <Row className="background-color text-color padding g-0 align-items-center">
      <Col md={1}>
        <Peripherals/>
      </Col>
      <Col md={1}>
        <Component/>
      </Col>
      <Col className='col-input' md={{ span: 2, offset: 1}}>
        <div style={{ position: 'relative' }}>
          <FaSearch className='search-icon'/>
          <input
            className='input-style'
            placeholder='What are you looking for?'
            size={40}
          />
        </div>
      </Col>
      <Col md={{span: 2, offset: 5}}>
        <Stack direction='horizontal' gap={4}>
          <h6
            className='cursor-pointer h6-margin'
            onClick={()=>{
              setShowSignUp(true);
            }}>
            Sign up
          </h6>
          <SignUp show={showSignUp} setShow={setShowSignUp} />
          <h6
            className='cursor-pointer h6-margin'
            onClick={()=>{
              setShowSignIn(true);
            }}>
            Sign in
          </h6>
          <SignIn show={showSignIn} setShow={setShowSignIn}/>
        </Stack>
      </Col>
    </Row>
  )
}

export default NavigationBar;