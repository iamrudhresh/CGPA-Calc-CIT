import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, FormControl } from '@mui/material';
import './CgpaCalculator.css';

const CgpaCalculator = () => {
  const [semesterGrades, setSemesterGrades] = useState({
    semester1: '',
    semester2: '',
    semester3: '',
    semester4: ''
  });
  const [cgpa, setCgpa] = useState(null);

  const handleGradeChange = (semester, event) => {
    setSemesterGrades({
      ...semesterGrades,
      [semester]: event.target.value
    });
  };

  const calculateCgpa = () => {
    let totalPoints = 0;
    let totalSemesters = 0;
    let missingGrades = false;

    Object.keys(semesterGrades).forEach(semester => {
      const grade = parseFloat(semesterGrades[semester]);
      if (isNaN(grade) || grade === '') {
        missingGrades = true;
        return;
      }
      totalPoints += grade;
      totalSemesters += 1;
    });

    if (missingGrades) {
      setCgpa('Please enter valid grades for all semesters.');
    } else {
      setCgpa((totalPoints / totalSemesters).toFixed(2));
    }
  };

  return (
    <Container className="cgpa-container">
      <Box className="title">
        <Typography variant="h4">CGPA Calculator</Typography>
      </Box>
      {['semester1', 'semester2', 'semester3', 'semester4'].map((semester, index) => (
        <FormControl fullWidth margin="normal" className="form-control" key={index}>
          <TextField
            label={`Semester ${index + 1} GPA`}
            variant="outlined"
            value={semesterGrades[semester]}
            onChange={(e) => handleGradeChange(semester, e)}
          />
        </FormControl>
      ))}
      <Box textAlign="center" my={2}>
        <Button variant="contained" color="primary" onClick={calculateCgpa}>Calculate CGPA</Button>
      </Box>
      {cgpa && (
        <Typography variant="h5" className="gpa">{cgpa}</Typography>
      )}
    </Container>
  );
};

export default CgpaCalculator;
