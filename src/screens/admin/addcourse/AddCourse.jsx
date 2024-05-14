import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getData, auth ,sendData } from '../../../config/firebase/firebasemethods';
import { useNavigate } from 'react-router-dom';
import PersistentDrawerLeft from '../../../components/Drawer';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material'; 

const AddCourse = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    Course: '',
    Instructor: '',
    Timing: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getData('students', uid)
          .then((res) => {
            // Update user data in state
            setUserData(res);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform form submission logic, such as sending data to backend
    console.log('Form data:', formData);
    setFormData({
      Course: '',
      Instructor: '',
      Timing: '',
    });
  };

  return (
    <div>
      <PersistentDrawerLeft screen={<div />} />

      <Grid container justifyContent="center" mt={4} style={{ padding: '20px' }}>
        <Grid item xs={10} sm={8} md={6}>
          <Paper elevation={3} p={4}>
            <Typography variant="h5" gutterBottom>
              Add a Course
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                label="Course Name"
                variant="outlined"
                name="Course"
                value={formData.Course}
                onChange={handleChange}
                required
                style={{ marginBottom: '20px' }}
                fullWidth
              />
              <TextField
                label="Instructor Name"
                variant="outlined"
                name="Instructor"
                value={formData.Instructor}
                onChange={handleChange}
                required
                style={{ marginBottom: '20px' }}
                fullWidth
              />
              <TextField
                label="Course Timing"
                variant="outlined"
                name="Timing"
                value={formData.Timing}
                onChange={handleChange}
                required
                style={{ marginBottom: '20px' }}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddCourse;
