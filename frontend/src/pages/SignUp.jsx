import { useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import '../index.css'

function SignUp ()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignin = async () => { 
    try {
      const response = await axios.post('/api/users/signup', {
        email: email,
        password: password,
        username: username
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
        <h3 className="signup-greet">Dont have account? Sign up!</h3>
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
            required
          />
        </div>
        <div className='form-group'>
          <label className="form-label">Username*</label>
          <input 
            className='form-input'
            type="username" 
            value={username} 
            placeholder='Enter Username'
            onChange={(e) => 
              setUsername(e.target.value)
            }
            required
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
            required
          />
        </div>
        <div>
          <button
            className="signup-button"
            onClick={handleSignin}
          >Sign up</button>
        </div>
        <p className="switch-text">
          Already have an account? <Link className={"link-style"} to="/login">Login Here.</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;