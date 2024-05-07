import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function LogoutModal({ open, onClose, onLogout }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ textAlign: 'center', borderRadius: '30px', padding: '16px' }}>
        <Typography variant="h6" component="div">
          Logout
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ marginTop: '8px' }}>
          Are you sure you want to log out?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onLogout} variant="contained" color="primary">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
