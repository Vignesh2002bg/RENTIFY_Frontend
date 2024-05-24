// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://rentify-springbackend-production.up.railway.app/api/users/register', user);
            alert('Registration successful');
            location.href="/login"
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <h4 className='text-center my-3'>RENTIFY - User Registration </h4>
            <div className='form-group w-75 mx-auto mt-3'>
            <input type="text" className='form-control' name="firstName" onChange={handleChange} placeholder="First Name" required />
            </div>
            <div className='form-group w-75 mx-auto mt-3'>
            <input type="text" className='form-control' name="lastName" onChange={handleChange} placeholder="Last Name" required />
            </div>
            <div className='form-group w-75 mx-auto mt-3'>
            <input type="email" className='form-control' name="email" onChange={handleChange} placeholder="Email" required />
            </div>
            <div className='form-group w-75 mx-auto mt-3'>
            <input type="text" className='form-control' name="phoneNumber" onChange={handleChange} placeholder="Phone Number" required />
            </div>
            <div className='form-group w-75 mx-auto mt-3'>
            <input type="password" className='form-control' name="password" onChange={handleChange} placeholder="Password" required />
            </div>
            <div className='form-group w-75 mx-auto mt-3'>
            <select name="role" className='form-control' onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>
            </select>
            </div >
            <div className='form-group w-75 mx-auto  mt-3'>
            <button className='btn btn-primary mx-auto d-block' type="submit">Register</button>
            </div>
            <div className='form-group w-75 mx-auto mt-3'>
            <a href='/login'>Already have an account? Login</a>
            </div>
        </form>
    );
};

export default Register;
