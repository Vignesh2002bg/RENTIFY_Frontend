import React,{useState} from 'react'
import axios from 'axios';
import Navbar from './Navbar';
const AddProperty = () => {
    const [property,setProperty]=useState({
        place: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        nearbyFacilities: '',
        ownerId:JSON.parse(localStorage.getItem('user'))?.id,
        likes:0
    });
    const handleChange = (e) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://rentify-springbackend-production.up.railway.app/api/properties', property);
            alert('Property added successfully');
        } catch (error) {
            alert('Failed to add property');
        }
    };
    
  return (
    <div>
        <Navbar/>
     <form onSubmit={handleSubmit}>
        <h4 className='mt-3 text-center'>Add All Your Property Here</h4>
        <div className='form-group w-75 mx-auto'>
            <label>Enter Property Place</label>
            <input type='text' name='place' onChange={handleChange} className='form-control' placeholder='current place'/>
        </div>
        <div className='form-group w-75 mx-auto'>
            <label>Enter Property Area</label>
            <input type='text' name='area' onChange={handleChange} className='form-control' placeholder='current place'/>
        </div>
        <div className='form-group w-75 mx-auto'>
            <label>Enter Property Bedrooms</label>
            <input type='text' name='bedrooms' onChange={handleChange} className='form-control' placeholder='bedrooms'/>
        </div>
        <div className='form-group w-75 mx-auto'>
            <label>Enter Property  Bathrooms</label>
            <input type='text' name='bathrooms' onChange={handleChange} className='form-control' placeholder='bathrooms'/>
        </div>
        <div className='form-group w-75 mx-auto'>
            <label>Enter Nearby:</label>
            <input type='text' name='nearbyFacilities' onChange={handleChange} className='form-control' placeholder='nearby facilities'/>
        </div>
        
        <div className='form-group mt-3'>
        <button type="submit" className='btn btn-primary mx-auto d-block w-25'>Add Now</button>
        </div>  
     </form>
    </div>
  )
}

export default AddProperty
