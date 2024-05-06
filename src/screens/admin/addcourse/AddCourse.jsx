import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getData, auth, signOutUser } from '../../../config/firebase/firebasemethods';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const [arr, setArr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);

       
        getData('students', uid)
          .then((res) => {
            setArr(res);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    });

    return () => {
      unsubscribe(); 
    }
  }, []);

  console.log(arr); 

  const handleLogout = () => {
    signOutUser() 
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div>
     
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AddCourse;
