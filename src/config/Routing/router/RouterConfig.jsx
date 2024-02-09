
import React from 'react'
import { BrowserRouter ,Routes , Route } from 'react-router-dom'
import Login from '../../../screens/login/Login'
import Admission from '../../../screens/admission/Admission'
import Student from '../../../screens/student/Student'



const RouterConfig = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '' element = {<Login />} />
      <Route path = '/admission' element = {<Admission />} />
      <Route path = '/student' element = {<Student />} />
      

    </Routes>
    </BrowserRouter>
  )
}

export default RouterConfig