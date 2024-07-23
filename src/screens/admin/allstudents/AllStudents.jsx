import React, { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from '../../../config/firebase/firebaseconfig';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 6, // Adjust the border radius value as needed
  boxShadow: 24,
  p: 4,
};


const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);

  useEffect(() => {
    gettingStudents();
  }, []);

  const gettingStudents = async () => {
    const q = query(collection(db, "student"), where('type', '==', 'student'));
    const querySnapshot = await getDocs(q);
    const studentsArray = querySnapshot.docs.map(doc => doc.data());
    setStudents(studentsArray);
    console.log(students);
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

  return (
    <div className="container mt-5">
      <h1 className="mb-4">All Students</h1>
      {
        students.length === 0 ? (
          <h2 style={{ textAlign: "center" }}>No students found...</h2>
        ) : (
          <div className="row">
            {students.map((student, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100" onClick={() => handleOpenModal(index)}>
                  <div className="card-body">
                    <img src={student.imageUrl} alt="Student" />
                    <div>
                      <h5 className="card-title">{student.fullName}</h5>
                      <p className="card-text">Course: {student.course}</p>
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
                    <Typography id="modal-modal-description" >
                      Full-Name :{student.fullName}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Email : {student.email}
                    </Typography> 
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Course Name : {student.course}
                    </Typography>
                     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Days  : {student.days}
                    </Typography> 
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Phone Number : {student.phone}
                    </Typography> 
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Address : {student.address}
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
