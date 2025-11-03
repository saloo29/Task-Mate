import { Link } from 'react-router'
import { useState } from 'react';
import axios from 'axios';

function Login ()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => { 
    try {
      const response = await axios.post('/api/users/signin', {
        email: email,
        password: password,
      });

      localStorage.setItem('token', response.data.token);
      console.log(response);
    } catch(err){
      console.log(err)
    }
    
  }

  return (
    <div className='auth-wrapper'>
      <div>
        <h3 className="signup-greet">Hello, Welcome Back!</h3>
      </div>

      <div className='form-container'>
        <div className='form-group'>
          <label className="form-label">Email*</label> 
          <input 
            className='form-input'
            type="text" 
            value={email} 
            placeholder='Enter Email'
            onChange={(e) => 
              setEmail(e.target.value)
            }
          />
        </div>

        <div className='form-group'>
          <label className="form-label">Password*</label>
          <input 
            className='form-input'
            type="password" 
            value={password} 
            placeholder='Enter Password'
            onChange={(e) => 
              setPassword(e.target.value)
            }
          />
        </div>
        <div>
          <button
            className="signup-button"
            onClick={handleLogin}
          >Login</button>
        </div>
        <p className="switch-text">
          Don't have an account? <Link className={"link-style"} to="/signup">Sign up.</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;