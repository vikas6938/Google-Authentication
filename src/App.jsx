import React, { useState } from 'react'
import Header from './Authentication/Component/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Authentication/Pages/Home';
import About from './Authentication/Pages/About';
import Product from './Authentication/Pages/Product';
import Login from './Authentication/Pages/Login';
import SignUp from './Authentication/Pages/SignUp';
import ProtectedRoute from './Authentication/Component/ProtectedRoute';
import UserProtect from './Authentication/Component/UserProtect';
import Error from './Authentication/Pages/Error';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return JSON.parse(localStorage.getItem("loginFlag")) || false;
    });


    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/error' element={<Error />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/products' element={<ProtectedRoute Component={Product} />} ></Route>
                <Route path='/login' element={<UserProtect Component={Login} />} ></Route>
                <Route path='/signup' element={<UserProtect Component={SignUp} />} ></Route>
            </Routes>
        </Router>
    )
}

export default App;
