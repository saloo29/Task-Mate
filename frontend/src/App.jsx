import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
      <div>
        <Routes>
          <Route path = "signup" element={<SignUp />}/>
          <Route path = "login" element={<Login />}/>
        </Routes>
      </div>
  )
}

export default App
