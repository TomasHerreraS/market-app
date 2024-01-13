import { useState, useEffect } from 'react';
import { Row, Col, Form as rbForm, Button, Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { addUser, verificationCode, sendEmail, deleteGlobalNumber } from '../../provider/user.provider';
import Swal from 'sweetalert2';
import '../../styles/modal-mail-validation.css';

const MailValidation = ({show, setShow}: any) => {
  const [badCode, setBadCode] = useState<boolean>(false);
  const [notFoundCode, setNotFoundCode] = useState<boolean>(false);
  const initialValues = { verificationCode: '' }
  const handleClose = () => setShow(false);

  const [seconds, setSeconds] = useState(180); // 3 minutos en segundos
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setBadCode(false);
      setIsActive(false);
      deleteGlobalNumber()
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const redirectToMainPage = () => {
    window.location.href = '/'; // Redirigir a la página principal
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='form-header' closeButton>
          <Modal.Title className='title-center'>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body className='form-body'>
          <Formik
            initialValues={initialValues}
            onSubmit={(value: any)=>{
              verificationCode(value).then((result)=>{
                if (result.status === 200) {
                  console.log('data ingresada correctamente');
                  // TODO: METER EL create acc
                  // TODO:  si tira eerror reload, y lo mismo abajo con el email por localstorage corregir, está corregido
                  const storedData = localStorage.getItem('data');
                  if (storedData !== null) {
                    const parsedData = JSON.parse(storedData);
                    console.log(parsedData);
                    addUser(parsedData);
                  } else {
                    Swal.fire({
                      icon: 'error',
                      text: 'Oops an error happened, please sign up again.',
                    }).then((result)=>{
                      if (result.isConfirmed) {
                        redirectToMainPage();
                      }
                    })
                  }
                }
              }).catch((error: any) => {
                const status = error.response.status;
                if (status === 404) {
                  setBadCode(false);
                  setNotFoundCode(true);
                } else if (status === 400) {
                  setNotFoundCode(false);
                  setBadCode(true);
                }
              })
          }}>
            <Form>
              <Row>
                <Col className='mb-2' md={12}>
                  <div>
                    <p className='timer-color text-center'>Code expire in: {seconds} seconds</p>
                  </div>
                  <rbForm.Control as={Field}
                    name='verificationCode'
                    type='text'
                    placeholder='Code verification'
                    autoComplete='off'
                    maxLength={5}
                    size='sm'/>
                  {badCode ?
                  <div className='error-color'>
                  <p>Invalid code, try again</p>
                  </div>: null}
                  {notFoundCode ?
                  <div>
                    <p className='error-color'>Code was not found</p>
                  </div>: null}
                  {!isActive ?
                  <div>
                    <p className='error-color'>Timeout, code was deleted</p>
                  </div>: null}
                </Col>
                <Col className='mt-3 text-center' md={!isActive || notFoundCode ? 6: 12}>
                  <Button variant="dark" type='submit' disabled={!isActive || notFoundCode}>Validate</Button>
                </Col>
                {!isActive || notFoundCode ?
                <Col className='mt-3 text-center' md={4}>
                  <Button variant="dark" onClick={()=> {
                    const email = localStorage.getItem('email');
                    if (email) {
                      sendEmail({email: email}).then(()=>{
                        setIsActive(true);
                        setSeconds(180);
                        setNotFoundCode(false);
                        Swal.fire({
                          icon: 'success',
                          text: 'Code sent'
                        })
                      })
                    } else {
                      Swal.fire({
                        icon: 'error',
                        text: 'Oops an error happened, please sign up again.'
                      }).then((result)=>{
                        if (result.isConfirmed) {
                          redirectToMainPage()
                        }
                      })
                    }
                  }}>Resend code</Button>
                </Col>: null}
              </Row>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MailValidation;