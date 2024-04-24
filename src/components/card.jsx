import React from 'react';
import { Card, CardContent, CardMedia, Typography, ThemeProvider, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles'; // Import makeStyles from @mui/styles for compatibility
import { useState } from 'react';

const theme = createTheme(); // Create a theme

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    maxWidth: 400,
    margin: 'auto',
    
    marginTop: theme.spacing(3),
  },
  cardContent: {
    flex: 1,
  },
  cardMedia: {
    width: 150,
    height: 150,
    objectFit: 'cover',
  },
}));

const UserProfileCard = ({ userDetails }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}> {/* Wrap your component with ThemeProvider */}
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          component="img"
          alt="User Image"
          height="150"
          image={userDetails.image} 
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" gutterBottom>
            {userDetails.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Course: {userDetails.courseName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Teacher: {userDetails.teacherName}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default UserProfileCard;
