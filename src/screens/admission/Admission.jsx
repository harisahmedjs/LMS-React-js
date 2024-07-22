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
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { collection, getDocs } from 'firebase/firestore'; 
import { signUpUser, addImageToStorage } from '../../config/firebase/FirebaseMethods';
import { db } from '../../config/firebase/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'animate.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const Admission = () => {

  const [showPassword, setShowPassword] = useState(false);
 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    setLoading(true);
    try {
      await signUpUser({ ...formData, imageUrl: formData.image });
      navigate('/');
    } catch (error) {
      console.error("Error signing up user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admission-container">
      
      <Container maxWidth="sm" className="form-container animate__animated animate__fadeIn">
        <Typography sx={{color : '#343a40'}} variant="h4" align="center" gutterBottom className="animate__animated animate__fadeInDown">
          Admission Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} className="animate__animated animate__fadeInLeft">
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                variant="outlined"
                sx={{background: 'white'}}
              />
            </Grid>
            <Grid item xs={12} className="animate__animated animate__fadeInRight">
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={{background: 'white'}}
              />
            </Grid>
            <Grid item xs={12} className="animate__animated animate__fadeInLeft">
      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        variant="outlined"
        sx={{ background: 'white' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Grid>
            <Grid item xs={12} className="animate__animated animate__fadeInRight">
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                sx={{background: 'white'}}
              />
            </Grid>
            <Grid item xs={12} className="animate__animated animate__fadeInLeft">
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                sx={{background: 'white'}}
              />
            </Grid>
            <Grid item xs={12} className="animate__animated animate__fadeInRight">
              <FormControl fullWidth margin="normal">
                <InputLabel sx={{color: 'black'}}>Course</InputLabel>
                <Select
                  label="Course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  sx={{background: 'white'}}
                >
                  {courses.map((course , index) => (
                    <MenuItem key={index} value={course.Course}>
                      {course.Course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} className="animate__animated animate__fadeInLeft">
              <FormControl fullWidth margin="normal">
                <InputLabel sx={{color: 'black'}}>Days</InputLabel>
                <Select
                  label="Days"
                  name="days"
                  value={formData.days}
                  onChange={handleChange}
                  sx={{background : 'white'}}
                >
                  <MenuItem value="WMF">WMF</MenuItem>
                  <MenuItem value="TTS">TTS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} className="animate__animated animate__fadeInRight">
              <input type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12} className="animate__animated animate__fadeInLeft">
            <Button
  onClick={handleImage}
  fullWidth
  sx={{
    marginBottom: '1rem',
    color : ' #343a40',
    backgroundColor: '#0078d4',
  }}
>
  Upload Image
</Button>
            </Grid>
            <Grid item xs={12} className="animate__animated animate__fadeInRight">
            <Button
  type="submit"
  fullWidth
  disabled={loading}
  sx={{
    backgroundColor: '#343a40',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#343a40', // Ensure it remains the same on hover
    },
  }}
  startIcon={loading && <CircularProgress size={24} />}
>
  {loading ? 'Submitting...' : 'Submit'}
</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Admission;
