import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { collection, getDocs } from "firebase/firestore"; 
import { signUpUser, addImageToStorage, db } from '../../config/firebase/firebasemethods';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Admission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '', 
    address: '',
    course: '',
    type: 'student',
    days: '', 
  });

  const [courses, setCourses] = useState([]);

  const getting = async () => {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const coursesList = [];
    querySnapshot.forEach((doc) => {
      coursesList.push({ id: doc.id, ...doc.data() });
    });
    setCourses(coursesList);
  };

  useEffect(() => {
    getting();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
  };
  
  const handleImage = async () => {
    try {
      const imageUrl = await addImageToStorage(formData.image, formData.email);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await signUpUser({ ...formData, imageUrl: formData.image });
      navigate('/student');
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Admission Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={3}
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Course</InputLabel>
              <Select
                label="Course"
                name="course"
                value={formData.course}
                onChange={handleChange}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.Course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Days</InputLabel>
              <Select
                label="Days"
                name="days"
                value={formData.days}
                onChange={handleChange}
              >
                <MenuItem value="WMF">WMF</MenuItem>
                <MenuItem value="TTS">TTS</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <input type="file" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleImage}>
              Upload Image
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Admission;