import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { UserProvider } from './context/user.context';
import { UserProvider } from './context/user.context';
import LandingPage from './components/LandingPage/LandingPage';
import PrivateRoute from './pages/PrivateRoute';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <Router>
        {/* We are wrapping our whole app with UserProvider so that */}
        {/* our user is accessible through out the app from any page*/}      
        <UserProvider>
          <div className="App">
            {/* <Navigation /> */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route exact path="/" element={<LandingPage />} />
              </Route>
            </Routes>
          </div>          
        </UserProvider>
    </Router>
  );
}

export default App;
