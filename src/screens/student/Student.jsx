import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getData } from '../../config/firebase/FirebaseMethods';
import MenuAppBar from '../../components/Navbar';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import Swal from 'sweetalert2';

const Student = () => {
  const auth = getAuth();
  const [arr, setArr] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);

        getData('student', uid).then((res) => {
          setArr(res);
        });
      }
    });
  
  }, []);

  console.log(arr);

  return (
    <>
      <MenuAppBar data={arr} />

      <Container className="mt-4">
        <Grid container spacing={4}>
          {arr && arr.length > 0 ? (
            arr.map((item, index) => (
              <Grid item key={index} xs={8} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.7)', // Adding box shadow
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 120,
                      width: 120,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      margin: '16px auto 0',
                    }}
                    image={item.image}
                    alt={item.fullName}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.course}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                No students found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Student;
