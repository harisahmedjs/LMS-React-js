import React from 'react'
import PersistentDrawerLeft from '../../components/Drawer'
import { Routes, Route, useNavigate } from 'react-router-dom'
import AllCourse from './allcourse/AllCourse'
import AddCourse from './addcourse/AddCourse'
import Allstudents from './allstudents/AllStudents'
import  SingleCourse from './singlecourse/SingleCourse'
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
             <Route path='/singlecourse' element = {<SingleCourse />} />
         </Routes>
        </Box>
    }/> 
  
    </>
  )
}

export default AdminDashboard