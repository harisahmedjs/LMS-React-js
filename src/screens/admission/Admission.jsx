import React, {  useState } from 'react';
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
  Box,
} from '@mui/material';
import { signUpUser , addImageToStorage} from '../../config/firebase/firebasemethods';
import { useNavigate } from 'react-router-dom';

const Admission = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '', // Added phone field
    address: '',
    course: '',
    days: '', // Changed from 'formData.course'
  });

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
      // Include the image URL in the formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: imageUrl,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    signUpUser({...formData , type: 'student' , imageUrl: formData.image })
    .then((res)=>{
      navigate('/student')
    })
    
    console.log(formData);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const imageUrl = await addImageToStorage(formData.image, formData.email);
  //     console.log("Image URL:", imageUrl);
  
  //     // Include the image URL in the formData before signing up the user
  //     const updatedFormData = {
  //       ...formData,
  //       type: 'student',
  //       imageUrl: imageUrl,  // Add this line
  //     };
  
  //     signUpUser(updatedFormData)
  //       async.then((res) => {
  //         navigate('/student');
  //       });
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };
  


  const consollingvalue = (e) =>{
    e.preventDefault();
  }

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
                <MenuItem value="null">Null</MenuItem>
                <MenuItem value="Web And App Development">Web And App Development</MenuItem>
                <MenuItem value="Graphic Designing">Graphic Designing</MenuItem>
                <MenuItem value="Flutter">Flutter</MenuItem>
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
                <MenuItem value="WMF">WMA</MenuItem>
                <MenuItem value="TTS">TTS</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
          <input type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleImage} > Upload Image
            </Button>
            </Grid>
            
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Admission;
