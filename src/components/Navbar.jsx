import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

export default function MenuAppBar({ data }) {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
          <img
            src={data.image}
            alt="Logout"
            style={{ height: 40, marginLeft: 2, cursor: 'pointer' }}
            onClick={handleOpenModal}
          />

          {/* Logout Modal */}
          <Dialog open={openModal} onClose={handleCloseModal}>
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
              Are you sure you want to log out?
            </Typography>
            <Button onClick={handleCloseModal} sx={{ mx: 2 }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle logout logic here
                handleCloseModal();
              }}
              variant="contained"
              color="primary"
            >
              Logout
            </Button>
          </Dialog>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
