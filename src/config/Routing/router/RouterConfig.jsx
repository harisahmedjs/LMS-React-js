
import React from 'react'
import { BrowserRouter ,Routes , Route } from 'react-router-dom'
import Login from '../../../screens/login/Login'
import Student from '../../../screens/student/Student'
import Admission from '../../../screens/admission/Admission'
import AdminDashboard from '../../../screens/admin/AdminDashboard'


const RouterConfig = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/' element = {<Login />} />
   <Route path = '/student' element = {<Student />} />
   <Route path = '/admission' element = {<Admission />} />  
   <Route path = 'admin/*' element = {<AdminDashboard />} />
       

    </Routes>
    </BrowserRouter>
  )
}

export default RouterConfig