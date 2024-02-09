import React, { useEffect } from 'react';
import MenuAppBar from '../../components/Navbar';
import { getData, auth } from '../../config/firebase/firebasemethods';
import { onAuthStateChanged } from 'firebase/auth';

const Student = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        const uid = user.uid;
        console.log(uid);

       
        getData('students', uid).then((res) => {
          console.log(res);
        });
      } 
    });
  }, []);

  return (
    <>
      <MenuAppBar />
    </>
  );
};

export default Student;
