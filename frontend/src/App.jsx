import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import './App.css'

function App() {
  return (
      <div>
        <Routes>
          <Route path = "signup" element={<SignUp />}/>
          <Route path = "login" element={<SignIn />}/>
        </Routes>
      </div>
  )
}

export default App
