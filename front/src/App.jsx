import { Route, Routes } from 'react-router-dom'
import Home from './Views/Home/Home'
import Dashboard from './Views/Dashboard/Dashboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  )
}

export default App
