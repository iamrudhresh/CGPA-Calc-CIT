import React, { useState } from 'react';
import { Container, Typography, Box, Select, MenuItem, Button, FormControl, InputLabel, FormHelperText } from '@mui/material';
import './GpaCalculator.css';

const departmentSubjects = {
  "CSE": [
    { code: "MA2401", name: "Discrete Mathematics", credits: 3 },
    { code: "CS2401", name: "Operating System", credits: 4 },
    { code: "CS2402", name: "Artificial Intelligence and Machine Learning", credits: 4 },
    { code: "CS2403", name: "Computer Networks", credits: 4 },
    { code: "CS2404", name: "Web Frameworks", credits: 4 },
    { code: "CS2405", name: "Software Engineering", credits: 4 },
    { code: "ES2401", name: "Employability Enhancement Skills", credits: 0 },
    { code: "HS2401", name: "Tamils and Technology", credits: 1 },
  ],
  "IT": [
    { code: "MA2401", name: "Discrete Mathematics", credits: 3 },
    { code: "IT2401", name: "Operating System", credits: 4 },
    { code: "IT2402", name: "Artificial Intelligence and Machine Learning", credits: 4 },
    { code: "IT2403", name: "Computer Networks", credits: 4 },
    { code: "IT2404", name: "Web Frameworks", credits: 4 },
    { code: "IT2405", name: "Software Engineering", credits: 4 },
    { code: "ES2401", name: "Employability Enhancement Skills", credits: 0 },
    { code: "HS2401", name: "Tamils and Technology", credits: 1 },
  ],
  "AI&DS": [
    { code: "MA2401", name: "Discrete Mathematics", credits: 3},
    { code: "AD2401", name: "Operating System", credits: 4 },
    { code: "AD2402", name: "Machine Learning", credits: 4 },
    { code: "AD2403", name: "Computer Networks", credits: 4 },
    { code: "AD2404", name: "Web Frameworks", credits: 4 },
    { code: "AD2405", name: "Artificial Intelligence", credits: 3 },
    { code: "ES2401", name: "Employability Enhancement Skills", credits: 1 },
    { code: "HS2401", name: "Tamils and Technology", credits: 1 },
  ],
  "AI&ML": [
    { code: "MA2401", name: "Discrete Mathematics", credits: 3 },
    { code: "AM2401", name: "Operating System", credits: 4 },
    { code: "AM2402", name: "Machine Learning", credits: 4 },
    { code: "AM2403", name: "Computer Networks", credits: 4 },
    { code: "AM2404", name: "Web Frameworks", credits: 4 },
    { code: "AM2405", name: "Artificial Intelligence", credits: 3 },
    { code: "ES2401", name: "Employability Enhancement Skills", credits: 1 },
    { code: "HS2401", name: "Tamils and Technology", credits: 1 },
  ],
  "Cybersecurity": [
    { code: "MA2401", name: "Discrete Mathematics", credits: 3 },
    { code: "CY2401", name: "Operating System", credits: 4 },
    { code: "CY2402", name: "Artificial Intelligence & Machine Learning", credits: 4 },
    { code: "CY2403", name: "Computer Networks", credits: 4 },
    { code: "CY2404", name: "Web Frameworks", credits: 4 },
    { code: "CY2405", name: "Software Engineering", credits: 4},
    { code: "ES2401", name: "Employability Enhancement Skills", credits: 1 },
    { code: "HS2401", name: "Tamils and Technology", credits: 1 },
  ],
  "ECE": [
    { code: "EC2401", name: "Control Systems", credits: 3 },
    { code: "EC2402", name: "Transmission lines and RF Design", credits: 3 },
    { code: "EC2403", name: "Microprocessors and Microcontrollers", credits: 4 },
    { code: "EC2404", name: "Digital Signal Processing", credits: 4 },
    { code: "EC2405", name: "Communication Systems", credits: 4 },
    { code: "EC2406", name: "VLSI design", credits: 4 },
    { code: "EC2407", name: "Course Project", credits: 1 },
    { code: "ES2401", name: "Employability Enhancement Skills", credits: 0 },
    { code: "HS2401", name: "Tamils and Technology", credits: 1 },
  ]
};

const gradeToPoint = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "RA": 0
};

const GpaCalculator = () => {
  const [department, setDepartment] = useState('');
  const [grades, setGrades] = useState({});
  const [gpa, setGpa] = useState(null);
  const [error, setError] = useState('');

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setGrades({});
    setGpa(null);
    setError('');
  };

  const handleGradeChange = (code, event) => {
    setGrades({
      ...grades,
      [code]: event.target.value
    });
  };

  const calculateGpa = () => {
    const subjects = departmentSubjects[department];
    let totalCredits = 0;
    let totalPoints = 0;
    let missingGrades = false;

    subjects.forEach(subject => {
      const grade = grades[subject.code];
      if (!grade) {
        missingGrades = true;
        return;
      }
      const credits = subject.credits;
      const points = gradeToPoint[grade];
      totalCredits += credits;
      totalPoints += points * credits;
    });

    if (missingGrades) {
      setError('Please enter grades for all subjects.');
    } else {
      setError('');
      setGpa(totalPoints / totalCredits);
    }
  };

  return (
    <Container className="gpa-container">
      <Box className="title">
        <Typography variant="h4">GPA Calculator</Typography>
      </Box>
      <FormControl fullWidth margin="normal" className="form-control">
        <InputLabel>Select your department</InputLabel>
        <Select value={department} onChange={handleDepartmentChange}>
          <MenuItem value="">Select</MenuItem>
          {Object.keys(departmentSubjects).map(dep => (
            <MenuItem key={dep} value={dep}>{dep}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{department ? `Enter your grades for the following subjects in ${department} department:` : ''}</FormHelperText>
      </FormControl>
      {department && departmentSubjects[department].map(subject => (
        
<FormControl variant="outlined" fullWidth margin="normal" className="form-control">
  <InputLabel>{subject.name} ({subject.code})</InputLabel>
  <Select
    value={grades[subject.code] || ''}
    onChange={(e) => handleGradeChange(subject.code, e)}
    label={`${subject.name} (${subject.code})`}
  >
    <MenuItem value="">Select</MenuItem>
    {Object.keys(gradeToPoint).map(grade => (
      <MenuItem key={grade} value={grade}>{grade}</MenuItem>
    ))}
  </Select>
</FormControl>





      ))}
      {error && <Typography className="error">{error}</Typography>}
      <Box textAlign="center" my={2}>
        <Button variant="contained" color="primary" onClick={calculateGpa}>Calculate GPA</Button>
      </Box>
      {gpa !== null && (
        <Typography variant="h5" className="gpa">Your GPA is: {gpa.toFixed(2)}</Typography>
      )}
    </Container>
  );
};

export default GpaCalculator;
