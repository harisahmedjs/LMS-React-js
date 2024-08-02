import React from 'react'
import PersistentDrawerLeft from '../../components/Drawer'
import { Routes, Route } from 'react-router-dom'
import AllCourse from './allcourse/AllCourse'
import AddCourse from './addcourse/AddCourse'
import Allstudents from './allstudents/AllStudents'
import { Box } from '@mui/material';


const AdminDashboard = () => {
  return (
    <>
    <PersistentDrawerLeft screen={
         <Box>
         <Routes>
             <Route path='/' element= {<AddCourse />} />
             <Route path='/allcourses' element = {<AllCourse />} />
             <Route path='/allstudents' element = {<Allstudents />} />
         </Routes>
        </Box>
    }/> 
  
    </>
  )
}

export default AdminDashboard