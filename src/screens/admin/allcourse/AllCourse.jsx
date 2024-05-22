import React , { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../../../config/firebase/firebasemethods';

const AllCourse = () => {

  const [arr, setArr] = useState([]);

  useEffect(() => {
    gettingCourses();
  }, []);

  const gettingCourses = async () => {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const coursesArray = [];
    querySnapshot.forEach((doc) => {
      coursesArray.push(doc.data());
    });
    setArr(coursesArray);
    console.log(coursesArray);
  };

  return (
    <div className="container mt-5">
    <div className="row">
      {arr.map((course, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{course.Course}</h5>
              <p className="card-text">Instructor: {course.Instructor}</p>
              <p ="card-text">Timing: {course.Timing}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  )
}

export default AllCourse
