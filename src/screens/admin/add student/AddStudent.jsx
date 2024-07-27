import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getData, sendData, addImageToStorage} from '../../../config/firebase/FirebaseMethods';
import { auth } from '../../../config/firebase/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import PersistentDrawerLeft from '../../../components/Drawer';
import { TextField, Button, Typography, Grid, Paper, CircularProgress, InputLabel, Select } from '@mui/material';
import Swal from 'sweetalert2';
import 'animate.css';

const AddStudent = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    Course: '',
    Instructor: '',
    Timing: '',
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getting = async () => {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const coursesList = [];
    querySnapshot.forEach((doc) => {
      coursesList.push({ id: doc.id, ...doc.data() });
    });
    setCourses(coursesList);
  };

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
    // setTimeout(() => {
    //   // Show SweetAlert2 alert on successful login
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Login Successful!',
    //     text: 'Welcome back!',
    //     customClass: {
    //       popup: 'animate__animated animate__zoomIn', // Use animate.css for animation
    //     },
    //     showConfirmButton: false, // Remove default "OK" button
    //     timer: 3000, // Auto-close after 3 seconds
    //     timerProgressBar: true, // Show progress bar
    //     position: 'top-end', // Position at the top-right corner
    //     width: '20rem', // Set custom width
    //     padding: '0.5rem', // Adjust padding
    //     backdrop: false, // Disable backdrop
    //     allowOutsideClick: false, // Disable clicking outside to close
    //   });
    // }, 1000);

    return () => {
      unsubscribe();
    };

  }, []);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
  };

  const handleImage = async () => {
    try {
      const imageUrl = await addImageToStorage(formData.image, formData.Course);
      console.log("Image URL:", imageUrl);
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: imageUrl,
      }));
      Swal.fire("Image uploaded successfully");
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
      .then((res) => {
        console.log('Course added to db');
        setFormData({
          Course: '',
          Instructor: '',
          Timing: '',
          imageurl: ''
        });
        Swal.fire("Course added successfully");
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
      <Grid container justifyContent="center" mt={4} width={'80%'} sm={8} margin={'auto'}  >
        <Grid item xs={10} sm={8} md={6} >
          <Paper elevation={3}  sx={{ padding: 3 }} >
            <Typography variant="h5" gutterBottom sx={{textAlign : 'center'}}>
              Add a Student
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' , width : "70%" , margin : 'auto'}}>
              <TextField
                label="Student Name"
                variant="outlined"
                name="Course"
                value={formData.Course}
                onChange={handleChange}
                required
                style={{ marginBottom: '20px' }}  
              />
             <InputLabel sx={{ color: 'black' }}>Course</InputLabel>
                <Select
                  label="Course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  sx={{ background: 'white' }}
                >
                  {courses.map((course, index) => (
                    <MenuItem key={index} value={course.Course}>
                      {course.Course}
                    </MenuItem>
                  ))}
                </Select>
               
              <input type="file" onChange={handleFileChange} />
            
              <Button
                onClick={handleImage}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  marginBottom: '1rem',
                  marginBottom: '15px',
                  marginTop: '15px'
                }}
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

export default AddStudent;