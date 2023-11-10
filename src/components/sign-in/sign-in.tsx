import {Modal, Form as rbForm, Row, Col, Button} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import {Md5} from 'ts-md5';
import { signIn } from '../../utils/type';
import '../../styles/sign-in.css';

const SignIn = ({show, setShow}: any) => {
  const handleClose = () => setShow(false);
  const initialValues: signIn = { email: '', password: '', keeplogged: false }

  type login = keyof signIn;

  const loginValidation: login[] = ['email', 'password', 'keeplogged']

  return(
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='form-header' closeButton>
          <Modal.Title className='title-center'>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body className='form-body'>
          <Formik
            initialValues={initialValues}
            onSubmit={(value)=>{
            if (loginValidation.every(login=> value[login] !== '')) {
              console.log(value);
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