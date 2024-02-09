import React, { useEffect, useState } from 'react';
import MenuAppBar from '../../components/Navbar';
import { getData, auth } from '../../config/firebase/firebasemethods';
import { onAuthStateChanged } from 'firebase/auth';

const Student = () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);

        getData('students', uid).then((res) => {
          setArr(res);
        });
      }
    });
  }, []);

  return (
    <>
     
      {console.log(arr)}

    
      {arr.map((item, index) => (
        <h1 key={index}>{item.image}</h1>
      ))}

      
      <MenuAppBar data={arr} />
    </>
  );
};

export default Student;
