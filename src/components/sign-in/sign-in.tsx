import {Modal, Form as rbForm, Row, Col, Button} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { signIn } from '../../provider/user.provider';
import { SignInData } from '../../type';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import '../../styles/sign-in.css';
import { signInToken, decodedToken } from '../../utils/token';
import { useEffect } from 'react';

const SignIn = ({show, setShow}: any) => {
  const handleClose = () => setShow(false);
  const initialValues: SignInData = { email: '', password: '', keeplogged: false }

  type login = keyof SignInData;

  const loginValidation: login[] = ['email', 'password', 'keeplogged']

  const cookies = new Cookies();
  
  return(
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='form-header' closeButton>
          <Modal.Title className='title-center'>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body className='form-body'>
          <Formik
            initialValues={initialValues}
            onSubmit={(value: SignInData)=>{
              console.log(value)
            if (loginValidation.every(login=> value[login] !== '')) {
              signIn(value).then((result) => {
                cookies.set('token', result, {
                  path: '/', // Especifica la ruta de la cookie (opcional, según tu caso de uso)
                  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // El token expirará en 7 días
                  secure: true, // Solo se enviará la cookie sobre HTTPS
                  sameSite: 'strict'
                })
                // Valida que el token existe, si existe entonces manda el mensaje y hace reload, sino te pide que lo intentes de nuevo.
                if (signInToken !== '' || signInToken !== undefined) {
                  console.log(signInToken);
                  Swal.fire({
                    icon: 'success',
                    title: 'Successfully logged in',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  })
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Please log in again.',
                  })
                }
              }).catch((error) => {
                const status = error.response.status;
                if (status === 401) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Incorrect email or password, try again.',
                  })
                }
              })
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Debe llenar todos los campos',
              })
            }
          }}>
            {({ errors, touched }) => (
              <Form>
                <Row>
                  <Col className='mb-2' md={12}>
                    <rbForm.Control as={Field} name='email' type='email' placeholder='Email' autoComplete='off' />
                    {errors.email && touched.email ? (
                      <div className='text-color'>{errors.email}</div>
                      ) : null}
                  </Col>
                  <Col className='mb-2' md={12}>
                    <rbForm.Control as={Field} name='password' type='password' placeholder='Password' autoComplete='off' />
                    {errors.password && touched.password ? (
                      <div className='text-color'>{errors.password}</div>
                      ) : null}
                  </Col>
                  <Col className='mb-2' md={12}>
                    <rbForm.Check as={Field} className='checkbox-label' name='keeplogged' type='checkbox' label='Keep me logged in' autoComplete='off' />
                    {errors.password && touched.password ? (
                      <div className='text-color'>{errors.password}</div>
                      ) : null}
                  </Col>
                  <Col className='mt-3 text-center' md={12}>
                    <Button variant="dark" type='submit'>Sign in</Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SignIn;