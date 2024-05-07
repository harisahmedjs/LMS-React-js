import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getData, auth, signOutUser } from '../../../config/firebase/firebasemethods';
import { useNavigate } from 'react-router-dom';
import LogoutModal from '../../../components/Modal';
import PersistentDrawerLeft from '../../../components/Drawer'; // Import the updated sidebar component

const AddCourse = () => {
  const [userData, setUserData] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to track sidebar open/close
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        getData('students', uid)
          .then((res) => {
            console.log('Fetched user data:', res);
            setUserData(res);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      } else {
        // User is not authenticated
        setUserData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array means this effect runs once after the component mounts

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true); // Function to open the logout modal
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar open/close
  };

  return (
    <>
     
<div>hello</div>

      <PersistentDrawerLeft
        screen={<div />} 
      />

    </>
  );
};

export default AddCourse;
