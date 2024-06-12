import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import GpaCalculator from './components/GpaCalculator';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <GpaCalculator />
      </Container>
    </>
  );
};

export default App;
