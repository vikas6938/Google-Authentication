import React, { useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth } from "../Pages/firebase"
import logo from '../Asset/image/logo.png';
import { onAuthStateChanged, signOut } from 'firebase/auth'

function Header() {
  const location = useLocation();
  const isCurrentPath = (path) => {
    return location.pathname === path;
  };
  const navigate = useNavigate();
  const loginFlag = JSON.parse(localStorage.getItem('loginFlag')) || false;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("userId", user.email);
        // console.log(`User ${user.email} is signed in.`);
      } else {
        localStorage.setItem("loginFlag", false);
      }
    })
  })

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('log Out')
      }).catch((err) => {
        console.log(err)
      })
    localStorage.setItem('loginFlag', false);
    navigate('/');
  }

  return (
    <Navbar bg="" className='bg-white shadow-sm p-3 ' data-bs-theme="dark">
      <Container>
        <div className="logo">
          <img src={logo} />
        </div>
        <Nav className="me-auto">
          <Nav.Link><Link className='text-dark fs-6 text-decoration-none' to={'/'}>Home</Link></Nav.Link>
          <Nav.Link><Link className='text-dark fs-6 text-decoration-none' to={'/about'}>About</Link></Nav.Link>
          <Nav.Link>{loginFlag ? (<><Link className='text-dark fs-6 text-decoration-none' to={'/products'}>Product</Link></>) : (<></>)}</Nav.Link>
        </Nav>
        {loginFlag ? (
          <>
            <button className='btn btn-outline-warning me-3 btn-sm'><Link className='text-reset text-decoration-none text-light' to={'/'} onClick={handleLogout}>Log Out</Link></button>
          </>
        ) : (
          <>
            <button className='btn btn-outline-success me-3 btn-sm'><Link className='text-dark fs-6 text-decoration-none' to={'/signup'}>Sign Up</Link></button>
            <button className='btn btn-outline-warning btn-sm'><Link className='text-dark fs-6 text-decoration-none' to={'/login'}>Login</Link></button>
          </>
        )
        }
      </Container>
    </Navbar >
  )
}

export default Header