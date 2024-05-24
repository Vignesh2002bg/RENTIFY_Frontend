import React, { useState } from 'react';
import axios from 'axios';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://rentify-springbackend-production.up.railway.app/api/users/login', { email, password });
            localStorage.setItem('user', JSON.stringify(response.data));
            if (response.data.role === 'seller') {
                window.location.href = '/';
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            alert('Login failed');
        }
    };


  return (
    <div className='container'>
     <form onSubmit={handleSubmit}>
        <h4 className='text-center mt-5'>RENTIFY - Login </h4>
        <div className='form-group w-75 mx-auto'>
        <label>Email</label>
        <input type="email" className='form-control' name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div className='form-group w-75 mx-auto'>
        <label>Password</label>
        <input type="password" className='form-control' name="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" required />
        </div>
        <div className='form-group mt-3'>
        <button type="submit" className='btn btn-primary mx-auto d-block w-25'>Login</button>
        </div> 
        <div className='form-group w-75 mx-auto mt-3'>
            <a href='/register'>Creating an Account</a>
            </div> 
        </form>
    </div>
  );
};

export default Login;
