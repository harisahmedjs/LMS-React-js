import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getData, sendData, addImageToStorage } from '../../../config/firebase/FirebaseMethods';
import { useNavigate } from 'react-router-dom';
import PersistentDrawerLeft from '../../../components/Drawer';
import { TextField, Button, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

const AddCourse = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    Course: '',
    Instructor: '',
    Timing: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getData('student', uid)
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
  }, [auth]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
  };

  const handleImageUpload = async () => {
    if (!formData.image) {
      Swal.fire('Please select an image first');
      return;
    }
    
    try {
      const imageUrl = await addImageToStorage(formData.image, formData.Course);
      console.log("Image URL:", imageUrl);
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: imageUrl,
      }));
      Swal.fire("Image uploaded successfully");

      // Clear the file input field
      document.querySelector('input[type="file"]').value = null;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

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
      .then(() => {
        console.log('Course added to db');
        setFormData({
          Course: '',
          Instructor: '',
          Timing: '',
          image: '', // Clear the image field
        });
        Swal.fire("Course added successfully");

        // Clear the file input field
        document.querySelector('input[type="file"]').value = null;
      })
      .catch((error) => {
        console.error('Error adding course:', error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error,
          showConfirmButton: false,
          timer: 1500
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <PersistentDrawerLeft screen={<div />} />
      <Grid container justifyContent="center" spacing={2} sx={{ mt: 4, px: { xs: 2, sm: 4 } }}>
        <Grid item xs={12} sm={10} md={8} lg={4 }>
          <Paper elevation={3} sx={{ padding: { xs: 2, sm: 3 }, width: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
              Add a Course
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
              <TextField
                label="Course Name"
                variant="outlined"
                name="Course"
                value={formData.Course}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Instructor Name"
                variant="outlined"
                name="Instructor"
                value={formData.Instructor}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Course Timing"
                variant="outlined"
                name="Timing"
                value={formData.Timing}
                onChange={handleChange}
                required
                fullWidth
              />
              
              <input
                type="file"
                onChange={handleFileChange}
                style={{ marginBottom: '20px', width: '100%' }}
              />
              
              <Button
                onClick={handleImageUpload}
                type="button" // Prevent form submission
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Upload Image
              </Button>
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
