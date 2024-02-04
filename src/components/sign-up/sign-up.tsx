import { useState, ChangeEvent, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Row, Col, Form as rbForm, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { userData } from '../../type';
import { states } from '../../utils/state';
import { getUniques, sendEmail } from '../../provider/user.provider';
import '../../styles/sign-up.css';


const SignUp = ({show, setShow, setShowValidation}: any) => {
  const initialValues: userData = { name: '', lastname: '', rol_id: 2, phone: '', state: '', city: '', address: '', email: '', password: '' }
  const handleClose = () => setShow(false);
  const [valueSelected, setValueSelected] = useState<string>('');
  const [phoneValue, setPhoneValue] = useState<string>('');
  const [uniqueData, setUniqueData] = useState<{phone: string, email: string}[]>([]);;

  type UserDataKeys = keyof userData;

  const userDataValidation: UserDataKeys[] = ['name', 'lastname', 'rol_id', 'email', 'password', 'phone', 'state', 'city', 'address'];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValueSelected(e.target.value);
  }

  const handlePhoneValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    let formattedValue = '';

    if (value.length <= 10) {
      if (value.length > 3) {
        formattedValue = `(${value.slice(0, 3)}) `; // The first 3 numbers will have parentheses and a space
        if (value.length > 6) {
          formattedValue += `${value.slice(3, 6)}-${value.slice(6, 10)}`; // if the value is greater than 6, it will be separated with a dash
        } else {
          formattedValue += value.slice(3); // If the value is less than or equal to 6, it will fill with numbers without restriction
        }
      } else {
        formattedValue = value;
      }
      setPhoneValue(formattedValue);
    }
  };

  const validationSchema = yup.object({
    name: yup.string()
      .typeError('Only letters are allowed')
      .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
      .min(3, 'Name is too short')
      .max(30, 'Name is too long'),
    lastname: yup.string()
      .typeError('Only letters are allowed')
      .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
      .min(3, 'Lastname is too short')
      .max(30, 'Lastname is too long'),
    city: yup.string()
      .typeError('Only letters and numbers are allowed')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Only letters and numbers are allowed')
      .min(3, 'City is too short')
      .max(100, 'City is too long'),
    address: yup.string()
      .typeError('Only letters and numbers are allowed')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Only letters and numbers are allowed')
      .min(3, 'Address is too short')
      .max(100, 'Address is too long'),
    email: yup.string()
      .typeError('Only letters are allowed')
      .min(13, 'Email is too short')
      .max(100, 'Email is too long'),
    password: yup.string()
      .typeError('Only letters and numbers are allowed')
      .min(3, 'Password is too short')
      .max(20, 'Password is too long'),
  })

  useEffect(()=>{
    getUniques().then((result)=>{
      setUniqueData(result.data);
    }).catch((error) => console.log(error))
  }, [])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='form-header' closeButton>
          <Modal.Title className='title-center'>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body className='form-body'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(value: userData)=>{
              value.state=valueSelected;
              value.phone=phoneValue;
            if (userDataValidation.every(field=> value[field] !== '')) {
              const phoneComparison = uniqueData.some(obj => obj.phone === value.phone);
              const emailComparison = uniqueData.some(obj => obj.email === value.email);
              if (phoneComparison) {
                Swal.fire({
                  icon: 'error',
                  text: 'Phone number already exists',
                })
              } else if (emailComparison) {
                Swal.fire({
                  icon: 'error',
                  text: 'Email already exists',
                })
              } else {
                sendEmail({email: value.email}).then(()=>{
                  Swal.fire({
                    icon: 'success',
                    text: 'Verify your email please.'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      localStorage.setItem('email', value.email);
                      localStorage.setItem('data', JSON.stringify(value));
                      handleClose();
                      setShowValidation(true);
                    }
                  })
                })
              }
            } else {
              Swal.fire({
                icon: 'error',
                title: 'All fields must be filled in',
              })
            }
          }}>
            {({ errors, touched }) => (
              <Form>
                <Row>
                  <Col className='mb-2' md={12}>
                    <rbForm.Control as={Field} name='name' type='text' placeholder='Name' autoComplete='off' />
                    {errors.name && touched.name ? (
                      <div className='error-color'>{errors.name}</div>
                      ) : null}
                  </Col>
                  <Col className='mb-2' md={12}>
                    <rbForm.Control as={Field} name='lastname' type='text' placeholder='Lastname' autoComplete='off' />
                    {errors.lastname && touched.lastname ? (
                      <div className='error-color'>{errors.lastname}</div>
                      ) : null}
                  </Col>
                  <Col className='mb-2' md={12}>
                    <rbForm.Control as={Field} name='phone' type='text' placeholder='Phone' value={phoneValue} autoComplete='off' 
                      onChange={handlePhoneValue}/>
                    {errors.phone && touched.phone ? (
                      <div className='error-color'>{errors.phone}</div>
                      ) : null}
                  </Col>
                  <Col className='mb-2' md={6}>
                    <rbForm.Select name='state' onChange={handleChange}>
                      <option value=''>State</option>
                      {states.map((state, index)=>{
                        return (
                          <option key={index} value={state}>{state}</option>
                        )
                      })}
                    </rbForm.Select>
                  </Col>
                  <Col className='mb-2' md={6}>
                    <rbForm.Control as={Field} name='city' type='text' placeholder='City' autoComplete='off' />
                    {errors.city && touched.city ? (
                      <div className='error-color'>{errors.city}</div>
                      ) : null}
                  </Col>
                  <Col className='mb-2' md={12}>
                    <rbForm.Control as={Field} name='address' type='text' placeholder='Address' autoComplete='off' />
                    {errors.address && touched.address ? (
                      <div className='error-color'>{errors.address}</div>
                      ) : null}
                  </Col>
                  <Col className='mb-2' md={12}>
                    <rbForm.Control as={Field} name='email' type='email' placeholder='Email' autoComplete='off' />
                    {errors.email && touched.email ? (
                      <div className='error-color'>{errors.email}</div>
                      ) : null}
                  </Col>
                  <Col className='mb-2' md={12}>
                    <rbForm.Control as={Field} name='password' type='password' placeholder='Password' autoComplete='off' />
                    {errors.password && touched.password ? (
                      <div className='error-color'>{errors.password}</div>
                      ) : null}
                  </Col>
                  <Col className='mt-3 text-center' md={12}>
                    <Button variant="dark" type='submit'>Sign up</Button>
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

export default SignUp;