import React, { useState, useContext } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user.context';

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { emailPasswordSignup } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    birthDate: '',
    employmentStatus: '',
    physicalAddress: '',
    postalAddress: '',
    country: '',
    role: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await emailPasswordSignup(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.idNumber,
        formData.birthDate,
        formData.employmentStatus,
        formData.role,
        formData.physicalAddress,
        formData.postalAddress,
        formData.country
      );
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <MDBContainer fluid className='bg-dark'>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol>
          <MDBCard className='my-4'>
            <MDBRow className='g-0'>
              <MDBCol md='6' className="d-none d-md-block">
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp' alt="Sample photo" className="rounded-start" fluid/>
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <h3 className="mb-5 text-uppercase fw-bold">User Registration Form</h3>
                  <form onSubmit={handleSubmit}>
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          label='First Name'
                          size='lg'
                          id='firstName'
                          type='text'
                          name='firstName'
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          label='Last Name'
                          size='lg'
                          id='lastName'
                          type='text'
                          name='lastName'
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          wrapperClass='mb-4'
                          label='ID Number'
                          size='lg'
                          id='idNumber'
                          type='text'
                          name='idNumber'
                          value={formData.idNumber}
                          onChange={handleChange}
                        />
                      </MDBCol>
                      <MDBCol md='6'>
                        <input
                          className='form-control form-control-lg mb-4'
                          type='date'
                          id='birthDate'
                          name='birthDate'
                          value={formData.birthDate}
                          onChange={handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Physical Address'
                      size='lg'
                      id='physicalAddress'
                      type='text'
                      name='physicalAddress'
                      value={formData.physicalAddress}
                      onChange={handleChange}
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Postal Address'
                      size='lg'
                      id='postalAddress'
                      type='text'
                      name='postalAddress'
                      value={formData.postalAddress}
                      onChange={handleChange}
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Country'
                      size='lg'
                      id='country'
                      type='text'
                      name='country'
                      value={formData.country}
                      onChange={handleChange}
                    />
                    <div className='mb-4'>
                      <label htmlFor='employmentStatus' className='form-label'>Employment Status</label>
                      <select
                        className='form-select form-select-lg'
                        id='employmentStatus'
                        name='employmentStatus'
                        value={formData.employmentStatus}
                        onChange={handleChange}
                      >
                        <option value=''>Select Employment Status</option>
                        <option value='unemployed'>Unemployed</option>
                        <option value='student'>Student</option>
                        <option value='employed'>Employed</option>
                        <option value='selfEmployed'>Self Employed</option>
                      </select>
                    </div>
                    <div className='mb-4'>
                      <label htmlFor='role' className='form-label'>Role</label>
                      <select
                        className='form-select form-select-lg'
                        id='role'
                        name='role'
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value=''>Select Role</option>
                        <option value='admin'>Admin</option>
                        <option value='manager'>Manager</option>
                        <option value='user'>User</option>
                      </select>
                    </div>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Email'
                      size='lg'
                      id='email'
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Password'
                      size='lg'
                      id='password'
                      type='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <p className="small fw-light mt-2 pt-1 mb-2">
                      Already have an account? <Link className="link-danger" to="/login">Login</Link>
                    </p>
                    <div className="d-flex justify-content-end pt-3">
                      <MDBBtn color='light' size='lg' type='reset'>Reset all</MDBBtn>
                      <MDBBtn className='ms-2' color='warning' size='lg' type='submit'>Submit form</MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
