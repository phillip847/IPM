import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/user.context';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox,
} from 'mdb-react-ui-kit';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: ""
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  }

  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        redirectNow();
      }
    }
  }

  useEffect(() => {
    loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      const loggedInUser = await emailPasswordLogin(form.email, form.password);
      if (loggedInUser) {
        redirectNow();
      }
    } catch (error) {
      if (error.statusCode === 401) {
        setAlert({ type: 'danger', message: "Invalid username/password. Try again!" });
      } else {
        setAlert({ type: 'danger', message: error.message });
      }
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow className="justify-content-center">
        <MDBCol col='10' md='6' className="d-flex align-items-center justify-content-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col='10' md='6'>
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-row align-items-center justify-content-center mb-4">
              <p className="lead fw-normal mb-0 me-3">Sign in with</p>

              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>

              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="twitter" />
              </MDBBtn>

              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="linkedin-in" />
              </MDBBtn>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="Email Address"
              id="formControlLg"
              type="email"
              name="email"
              size="lg"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}

            {/* <MDBInput
              wrapperClass="mb-4"
              label="User Role"
              id="formControlLg"
              type="text"
              name="role"
              size="lg"
              value={form.role}
              onChange={handleChange}
              isInvalid={!!errors.role}
            />
            {errors.role && <div className="text-danger">{errors.role}</div>} */}

            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              name="password"
              size="lg"
              value={form.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="#!">Forgot password?</a>
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn className="mb-0 px-5" size="lg" type="submit">
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account? <Link className="link-danger" to="/signup">Register</Link>              
              </p>
            </div>
          </form>

          {alert && (
            <div className={`alert alert-${alert.type} mt-4`} role="alert">
              {alert.message}
            </div>
          )}
        </MDBCol>
      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-center justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>

        <div>
          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
            <MDBIcon fab icon="facebook-f" size="md" />
          </MDBBtn>

          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
            <MDBIcon fab icon="twitter" size="md" />
          </MDBBtn>

          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
            <MDBIcon fab icon="google" size="md" />
          </MDBBtn>

          <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
            <MDBIcon fab icon="linkedin-in" size="md" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
};

export default Login;
