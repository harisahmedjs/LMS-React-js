import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getData, sendData } from '../../../config/firebase/FirebaseMethods';
import { auth } from '../../../config/firebase/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import PersistentDrawerLeft from '../../../components/Drawer';
import { TextField, Button, Typography, Grid, Paper, CircularProgress } from '@mui/material';

const AddCourse = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    Course: '',
    Instructor: '',
    Timing: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getData('students', uid)
          .then((res) => {
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
    setLoading(true);
    sendData(formData, 'courses')
      .then((res) => {
        console.log('Course added to db');
        setFormData({
          Course: '',
          Instructor: '',
          Timing: '',
        });
      })
      .catch((error) => {
        console.error('Error adding course:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <PersistentDrawerLeft screen={<div />} />
      <Grid container justifyContent="center" mt={4} width={'80%'} margin={'auto'} sx={{ borderRadius: '40px' }} >
        <Grid item xs={10} sm={8} md={6} >
          <Paper elevation={3} sx={{ padding: 3 }} >
            <Typography variant="h5" gutterBottom sx={{textAlign : 'center'}}>
              Add a Course
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' , width : "70%" , margin : 'auto'}}>
              <TextField
                label="Course Name"
                variant="outlined"
                name="Course"
                value={formData.Course}
                onChange={handleChange}
                required
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Instructor Name"
                variant="outlined"
                name="Instructor"
                value={formData.Instructor}
                onChange={handleChange}
                required
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Course Timing"
                variant="outlined"
                name="Timing"
                value={formData.Timing}
                onChange={handleChange}
                required
                style={{ marginBottom: '20px' }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                startIcon={loading ? <CircularProgress size={24} /> : null}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddCourse;
