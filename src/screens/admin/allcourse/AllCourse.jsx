import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../../../config/firebase/firebaseconfig';
import 'animate.css';

const AllCourse = () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    gettingCourses();
  }, []);

  const gettingCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const coursesArray = [];
      querySnapshot.forEach((doc) => {
        coursesArray.push(doc.data());
      });
      setArr(coursesArray);
      console.log(coursesArray);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 animate__animated animate__fadeInDown">All Courses</h1>
      <div className="row">
        {arr.map((course, index) => (
          <div key={index} className="col-md-5 mb-4 animate__animated animate__zoomIn">
            {/* Adjust col-md-3 to col-md-4 or col-md-6 based on your desired width */}
            <div className="card shadow-sm">
              <div className="card-body ">
                <h5 className="card-title">{course.Course}</h5>
                <p className="card-text">Instructor: {course.Instructor}</p>
                <p className="card-text">Timing: {course.Timing}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourse;
