import React, { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from "firebase/firestore";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { RiDeleteBin4Line } from '@remixicon/react';
import { deleteDocument } from '../../../config/firebase/FirebaseMethods';
import 'animate.css';
import { db } from '../../../config/firebase/FirebaseConfig';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 6,
  p: 4,
};

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);

  useEffect(() => {
    gettingStudents();
  }, []);

  const gettingStudents = async () => {
    try {
      const q = query(collection(db, "student"), where('type', '==', 'student'));
      const querySnapshot = await getDocs(q);
      const studentsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentsArray);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleOpenModal = (index) => {
    setSelectedStudentIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedStudentIndex(null);
  };

  const handleBackdropClose = () => {
    handleCloseModal();
  };

  const deleteCourse = async (index) => {
    try {
      await deleteDocument(students[index].id, "student"); // Assuming "students" is the collection name
      gettingStudents(); // Refresh students after deletion
    } catch (error) {
      console.error("Error deleting student:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 mb-4 animate__animated animate__fadeInDown">All Students</h1>
      {
        students.length === 0 ? (
          <h2 style={{ textAlign: "center" }}>No students found...</h2>
        ) : (
          <div className="row">
            {students.map((student, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <img src={student.imageUrl} alt="Student" onClick={() => handleOpenModal(index)} />
                    <div>
                      <h5 className="card-title">{student.fullName}</h5>  
                      <p className="card-text">Course: {student.course}</p>
                      <button className='btn' onClick={() => deleteCourse(index)}><RiDeleteBin4Line/></button>
                    </div>
                  </div>
                </div>
                <Modal
                  open={selectedStudentIndex === index}
                  onClose={handleCloseModal}
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    onClick: handleBackdropClose,
                    sx: { backdropFilter: 'blur(3px)' },
                  }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-description">
                      Full Name: {student.fullName}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Email: {student.email}
                    </Typography> 
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Course Name: {student.course}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Days: {student.days}
                    </Typography> 
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Phone Number: {student.phone}
                    </Typography> 
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Address: {student.address}
                    </Typography>
                  </Box>
                </Modal>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
};

export default AllStudents;
