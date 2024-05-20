import React, { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from "firebase/firestore"; 
import { db } from '../../../config/firebase/firebasemethods';

const AllStudents = () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    gettingStudents();
  }, []);

  const gettingStudents = async () => {
    const q = query(collection(db, "students"), where('type', '==', 'student'));
    const querySnapshot = await getDocs(q);
    const studentsArray = [];
    querySnapshot.forEach((doc) => {
      studentsArray.push(doc.data());
    });
    setArr(studentsArray);
    console.log(studentsArray);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">All Students</h1>
      <div className="row">
        {arr.map((student, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <img src={student.imageUrl} alt="Student" />
                <div>
                  <h5 className="card-title">{student.fullName}</h5>
                  <p className="card-text">Course: {student.course}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStudents;
