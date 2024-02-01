import React, { useState } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import '../Asset/css/style.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const provider = new GoogleAuthProvider()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const validate = () => {
    if (!email) {
      setError("Email is required.");
      return false;
    }
    else if (!password) {
      setError("Password is required.");
      return false;
    }
    else if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) {
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem("loginFlag", "true");
        setTimeout(() => {
          navigate('/products');
        }, 500);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  const handleLoginWithGoogle = (e) => {
    e.preventDefault()
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Login Email : ' + result.user.email)
        localStorage.setItem("loginFlag", "true");
        setTimeout(() => {
          navigate('/products');
        }, 500);
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="v-100 d-flex align-items-center justify-content-center">
      <div>
        <div className="signup-container border border-2 rounded-3">
          <form>
            <h3 className='text-center fs-5 mb-4'>Log In</h3>
            {error && <p className="error-message text-danger text-center fs-6 fw-semibold mb-4">{error}</p>}
            <input type="email" className='form-control mb-3' onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" value={email}
            />
            <input type="password" className='form-control mb-3' onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' value={password}
            />
            <p className='text-center fs-6 my-4'>
              Don't have an account?
              <Link to={'/signup'} className=" text-primary text-decoration-none"> Sign up</Link>
            </p>
            <button onClick={handleLogin} className='btn btn-outline-warning w-100'>Log In</button>
            <p className='text-center my-4 text-muted'>OR</p>
            <button className='btn btn-outline-success w-100' onClick={handleLoginWithGoogle}><i class="bi bi-google fs-6 me-3"></i> Log In With Google</button>
          </form>
        </div>
      </div>
    </div>
  );
}
