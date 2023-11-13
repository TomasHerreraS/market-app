<<<<<<< HEAD
import {useState} from 'react'
import { Row, Col, Stack } from "react-bootstrap";
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
import '../../styles/navigation-bar.css';
import Peripherals from './peripheral';
import Component from './component';
import { FaSearch } from 'react-icons/fa';
=======
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import SignIn from "../sign-in/sign-in";
import SignUp from "../sign-up/sign-up";
import "../../styles/navigation-bar.css";
import Peripherals from "./peripheral";
import Component from "./component";
import { FaSearch } from "react-icons/fa";
import ThemeToggleButton from "../theme-button";
import { Fan } from "react-bootstrap-icons";
>>>>>>> c30e3a0ff342fb6b551542c6dd20ddb7e95c8d8b

const NavigationBar = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  return (
    <Row className="background-color text-color padding g-0 align-items-center">
<<<<<<< HEAD
      <Col md={1}>
        <Peripherals/>
=======
      <Col>
      <Fan size={40}/>
>>>>>>> c30e3a0ff342fb6b551542c6dd20ddb7e95c8d8b
      </Col>
      <Col>
      <div className="button-space">
        <Peripherals />
      </div>
      </Col>
<<<<<<< HEAD
      <Col className='col-input' md={{ span: 2, offset: 1}}>
        <div style={{ position: 'relative' }}>
          <FaSearch className='search-icon'/>
=======
      <Col>
        <Component />
      </Col>
      <Col md={5}>
        <div style={{ position: "relative" }}>
          <FaSearch className="search-icon" />
>>>>>>> c30e3a0ff342fb6b551542c6dd20ddb7e95c8d8b
          <input
            className="input-style"
            placeholder="What are you looking for?"
            size={40}
          />
        </div>
      </Col>
<<<<<<< HEAD
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
=======
      <Col md={1}>
        <ThemeToggleButton />
      </Col>
      <Col md={1}>
        <h6
          className="cursor-pointer h6-margin"
          onClick={() => {
            setShowSignUp(true);
          }}
        >
          Sign up
        </h6>
        <SignUp show={showSignUp} setShow={setShowSignUp} />
      </Col>
      <Col md={1}>
        <h6
          className="cursor-pointer h6-margin"
          onClick={() => {
            setShowSignIn(true);
          }}
        >
          Sign in
        </h6>
        <SignIn show={showSignIn} setShow={setShowSignIn} />
>>>>>>> c30e3a0ff342fb6b551542c6dd20ddb7e95c8d8b
      </Col>
    </Row>
  );
};

export default NavigationBar;
