import { Route, Routes } from 'react-router-dom'
import Home from './Views/Home/Home'
import Dashboard from './Views/Dashboard/Dashboard'
import Register from './Views/Register/Register'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default App
