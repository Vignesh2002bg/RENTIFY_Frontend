import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const SellerProperties = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`https://rentify-springbackend-production.up.railway.app/api/properties/${user.id}`);
                setProperties(response.data);
                setFilteredProperties(response.data); // Set filteredProperties initially to all properties
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        if (user && user.id) {
            fetchProperties();
        }
    }, [user]);

    useEffect(() => {
        const filtered = properties.filter(property =>
            property.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.bedrooms.toString().includes(searchQuery) ||
            property.bathrooms.toString().includes(searchQuery) ||
            property.nearbyFacilities.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProperties(filtered);
    }, [searchQuery, properties]);

    const handleDelete = async (propertyId) => {
        try {
            await axios.delete(`https://rentify-springbackend-production.up.railway.app/api/properties/${propertyId}`);
            setProperties(properties.filter(property => property.id !== propertyId));
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className='container text-center '>
            <nav class="navbar navbar-light   justfiy-content-center  ">
                <form class="form-inline ">
                    <div class="input-group ">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Find Your Suitable Properties</span>
                        </div>
                        <input type="text" className="form-control" value={searchQuery} onChange={handleSearch} placeholder="Enter the Filter" aria-label="Filter" aria-describedby="basic-addon1" />
                    </div>
                </form>
            </nav>
            </div>
            {searchTerm&&filteredProperties.length === 0 ? (
                <p>No data found</p>
            ) : (
<div className='container'>
                    <div className='row'>
                        {filteredProperties.map((property, index) => (
                            <div className={`col-md-4 col-sm-6`} key={property.id}>
                                <div className="card  m-3" key={property.id}>
                                    <div className="card-body">
                                        <h5 className="card-title">{property.place}</h5>
                                        <p className="card-text">{property.area}</p>
                                        <p className="card-text">{property.bedrooms} Bedrooms</p>
                                        <p className="card-text">{property.bathrooms} Bathrooms</p>
                                        <p className="card-text">Nearby: {property.nearbyFacilities}</p>
                                        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                                        <button className="btn btn-outline-danger mt-2 " onClick={() => handleDelete(property.id)}>Delete</button>

                                        <button className="btn btn-outline-primary mt-2">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            )}
        </div>
    );
};

export default SellerProperties;
