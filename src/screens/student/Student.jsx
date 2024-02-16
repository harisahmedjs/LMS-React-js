import React, { useEffect, useState } from 'react';
import MenuAppBar from '../../components/Navbar';
import { getData, auth } from '../../config/firebase/firebasemethods';
import { onAuthStateChanged } from 'firebase/auth';
// import UserProfileCard from '../../components/card';

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

  console.log(arr)
  return (
    <>
     <MenuAppBar data={arr} />

{/* {arr.map((item,index)=>{
  <div>
    <h1 key={index}>Name :- {item.fullName}</h1>
  </div>
})} */}
{arr.map((item,index)=>
( <div>
  <h3> {item.fullName}</h3>
  <h4>{item.course}</h4>
  {/* <img src= alt="" /> */}
  </div>

    ))}
    
    </>
  );
};

export default Student;
