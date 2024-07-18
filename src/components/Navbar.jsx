import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../config/firebase/FirebaseMethods';

export default function MenuAppBar({ data }) {
  const [openModal, setOpenModal] = React.useState(false);
const navigate = useNavigate()
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
   signOutUser().then((res)=> navigate('/'))
    handleCloseModal();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

          {/* Menu Icon (on the left) */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Welcome To LMS
          </Typography>

          {/* Logout Image (on the right) */}
          {data && data.length > 0 && (
            <img 
              src={data[0].image}  // Assuming image source is in the data prop
              alt="User"
              style={{ height: 40, marginLeft: 2, cursor: 'pointer', borderRadius: '50%' }}
              onClick={handleOpenModal} 
            />
          )}

        </Toolbar>
      </AppBar>

      {/* Logout Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>

        <DialogContent>
          <Box textAlign="center" borderRadius='30px' p={2}>
            <Typography variant="h5" component="div">
              Logout
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Are you sure you want to log out?
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} variant="contained" color="primary">
            Logout
          </Button>
        </DialogActions>

      </Dialog>
    </Box>
  );
}
 