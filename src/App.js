import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CssBaseline, Container, AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import GpaCalculator from './components/GpaCalculator';
import CgpaCalculator from './components/CgpaCalculator';
import './App.css';

const CustomAppBar = styled(AppBar)`
  background-color: #333;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 20px;
  font-size: 1.2em;
  &:hover {
    text-decoration: underline;
  }
`;

const CenteredContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <CustomAppBar position="static">
        <Toolbar style={{ justifyContent: 'center' }}>
          <NavLink to="/gpa">GPA Calculator</NavLink>
          <NavLink to="/cgpa">CGPA Calculator</NavLink>
        </Toolbar>
      </CustomAppBar>
      <div className="main-content">
        <Routes>
          <Route path="/gpa" element={
            <CenteredContainer>
              <GpaCalculator />
            </CenteredContainer>
          } />
          <Route path="/cgpa" element={
            <CenteredContainer>
              <CgpaCalculator />
            </CenteredContainer>
          } />
          <Route path="/" element={
            <CenteredContainer>
              <Typography variant="h4" align="center" gutterBottom>
                Welcome to the GPA & CGPA Calculator
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                Select a calculator from the navigation above.
              </Typography>
            </CenteredContainer>
          } />
        </Routes>
      </div>
      <footer className="footer">
        Designed and Developed by Rudhresh S
      </footer>
    </Router>
  );
};

export default App;
