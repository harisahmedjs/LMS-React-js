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

  console.log(arr);

  return (
    <>
      <MenuAppBar data={arr} />

      <div className="container mt-4 w-75">
        <div className="row">
          {arr && arr.map((item, index) => ( // Add null check for arr
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img src={item.image} className="card-img-top " alt="" />
                <div className="card-body">
                  <h5 className="card-title">{item.fullName}</h5>
                  <p className="card-text">{item.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Student;
