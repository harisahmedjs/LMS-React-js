
import React from 'react'
import { BrowserRouter ,Routes , Route } from 'react-router-dom'
import Login from '../../../screens/login/Login'
import Admission from '../../../screens/admission/Admission'



const RouterConfig = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '' element = {<Login />} />
      <Route path = '/admission' element = {<Admission />} />

    </Routes>
    </BrowserRouter>
  )
}

export default RouterConfig