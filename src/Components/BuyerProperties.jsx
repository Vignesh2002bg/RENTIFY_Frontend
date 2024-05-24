import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const BuyerProperties = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [sellerDetails, setSellerDetails] = useState(null);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);
    const [likedProperties, setLikedProperties] = useState(new Set());
    const [filters, setFilters] = useState({ place: '', bedrooms: '', bathrooms: '' });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('https://rentify-springbackend-production.up.railway.app/api/properties');
                setProperties(response.data);
                setFilteredProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    useEffect(() => {
        const fetchLikedProperties = async () => {
            if (user && user.id) {
                try {
                    const response = await axios.get(`https://rentify-springbackend-production.up.railway.app/api/likes/user/${user.id}`);
                    const likedPropertyIds = response.data.map(like => like.propertyId);
                    setLikedProperties(new Set(likedPropertyIds));
                } catch (error) {
                    console.error('Error fetching liked properties:', error);
                }
            }
        };

        fetchLikedProperties();
    }, [user]);

    const handleInterestedClick = async (propertyId) => {
        try {
            const response = await axios.get(`https://rentify-springbackend-production.up.railway.app/api/properties/${propertyId}/seller`);
            setSellerDetails(response.data);
            setSelectedPropertyId(propertyId);
        } catch (error) {
            console.error('Error fetching seller details:', error);
        }
    };

    const handleToggleLike = async (propertyId) => {
        try {
            if (likedProperties.has(propertyId)) {
                await axios.delete(`https://rentify-springbackend-production.up.railway.app/api/likes/${propertyId}?userId=${user.id}`);
                setLikedProperties(prevLikedProperties => {
                    const newLikedProperties = new Set(prevLikedProperties);
                    newLikedProperties.delete(propertyId);
                    return newLikedProperties;
                });
                setProperties(prevProperties => prevProperties.map(property =>
                    property.id === propertyId ? { ...property, likes: property.likes - 1 } : property
                ));
            } else {
                await axios.post(`https://rentify-springbackend-production.up.railway.app/api/likes/${propertyId}?userId=${user.id}`);
                setLikedProperties(prevLikedProperties => new Set([...prevLikedProperties, propertyId]));
                setProperties(prevProperties => prevProperties.map(property =>
                    property.id === propertyId ? { ...property, likes: property.likes + 1 } : property
                ));
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    useEffect(() => {
        const applyFilters = () => {
            let filtered = properties;
            if (filters.place) {
                filtered = filtered.filter(property => property.place.toLowerCase().includes(filters.place.toLowerCase()));
            }
            if (filters.bedrooms) {
                filtered = filtered.filter(property => property.bedrooms.toString() === filters.bedrooms);
            }
            if (filters.bathrooms) {
                filtered = filtered.filter(property => property.bathrooms.toString() === filters.bathrooms);
            }
            setFilteredProperties(filtered);
        };

        applyFilters();
    }, [filters, properties]);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <h2>Available Properties</h2>

                <div className="filters mb-4">
                    <input
                        type="text"
                        name="place"
                        placeholder="Filter by place"
                        value={filters.place}
                        onChange={handleFilterChange}
                        className="form-control mb-2"
                    />
                    <input
                        type="number"
                        name="bedrooms"
                        placeholder="Filter by bedrooms"
                        value={filters.bedrooms}
                        onChange={handleFilterChange}
                        className="form-control mb-2"
                    />
                    <input
                        type="number"
                        name="bathrooms"
                        placeholder="Filter by bathrooms"
                        value={filters.bathrooms}
                        onChange={handleFilterChange}
                        className="form-control mb-2"
                    />
                </div>

                <div className='row'>
                    {filteredProperties.map(property => (
                        <div className="col-md-4 col-sm-6 mb-4" key={property.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{property.place}</h5>
                                    <p className="card-text">{property.area}</p>
                                    <p className="card-text">{property.bedrooms} Bedrooms</p>
                                    <p className="card-text">{property.bathrooms} Bathrooms</p>
                                    <p className="card-text">Likes: {property.likes}</p>
                                    <div className='d-grid gap-2'>
                                    <button
                                        className={`btn ${likedProperties.has(property.id) ? 'btn-primary' : 'btn-outline-success'}`}
                                        onClick={() => handleToggleLike(property.id)}
                                    >
                                        {likedProperties.has(property.id) ? 'Unlike' : 'Like'}
                                    </button>
                                    <button className="btn btn-primary ml-2" onClick={() => handleInterestedClick(property.id)}>I'm Interested</button>
                                    {selectedPropertyId === property.id && sellerDetails && (
                                        <div className="seller-details mt-3">
                                            <h6>Seller Details:</h6>
                                            <p>Name: {sellerDetails.firstName} {sellerDetails.lastName}</p>
                                            <p>Email: {sellerDetails.email}</p>
                                            <p>Phone Number: {sellerDetails.phoneNumber}</p>
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BuyerProperties;
