import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from '../../../config/firebase/firebaseconfig';
import 'animate.css';
import { deleteDocument } from '../../../config/firebase/FirebaseMethods';
import PersistentDrawerLeft from '../../../components/Drawer';
import { RiDeleteBack2Line, RiDeleteBackLine, RiDeleteBin2Fill, RiDeleteBin4Line, RiEdit2Line, RiEditBoxFill, RiEditLine } from '@remixicon/react';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track which course is being edited
  const [updatedCourse, setUpdatedCourse] = useState({}); // Store updated course data

  useEffect(() => {
    gettingCourses();
  }, []);

  const gettingCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const coursesArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(coursesArray);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setUpdatedCourse(courses[index]); // Initialize updated course with current data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const updateDocument = async (updatedData) => {
    try {
      const { id, ...rest } = updatedData; // Destructure id and rest of the fields
      const updateRef = doc(db, "courses", id); // Reference to the document to update
      await updateDoc(updateRef, rest); // Update the document with the new data
      console.log("Document updated successfully!");
      gettingCourses(); // Refresh course list after update
      setEditingIndex(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleSaveClick = () => {
    updateDocument(updatedCourse);
  };

  function deleteCourse(index){
    deleteDocument(courses[index].id, "courses");
    gettingCourses(); // Refresh course list after deletion
    setEditingIndex(null); // Exit edit mode
  }

  return (
    <>
    <div className="container mt-5">
      <h1 className="text-center mb-4 animate__animated animate__fadeInDown">All Courses</h1>
      {courses.length === 0 ? (
        <h2 className="text-center">No courses found...</h2>
      ) : (
        <div className="row">
          {courses.map((course, index) => (
            <div key={index} className="col-md-4 mb-4 animate__animated animate__zoomIn">
              <div className="card shadow-sm">
                <div className="card-body d-flex flex-column">
                  {editingIndex === index ? (
                    <>
                      <div className='d-flex justify-content-between align-items-center mb-2'>
                        <input
                          type="text"
                          name="Course"
                          value={updatedCourse.Course || ""}
                          onChange={handleInputChange}
                        />
                        <button onClick={handleSaveClick}>Save</button>
                      </div>
                      <input
                        type="text"
                        name="Instructor"
                        value={updatedCourse.Instructor || ""}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="Timing"
                        value={updatedCourse.Timing || ""}
                        onChange={handleInputChange}
                      />
                    </>
                  ) : (
                    <>
                      <div className='d-flex justify-content-between align-items-center'>
                        <img src={course.image} alt="Course" />
                        <h5 className="card-title">{course.Course}</h5>
                      </div>
                      <p className="card-text">Instructor: {course.Instructor}</p>
                      <p className="card-text">Timing: {course.Timing}</p>
                      <button onClick={() => handleEditClick(index)}><RiEdit2Line/></button>
                      <button onClick={() => deleteCourse(index)}><RiDeleteBin4Line/></button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
</>
  );
};
export default AllCourses;
