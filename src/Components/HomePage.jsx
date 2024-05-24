import React from 'react';

const HomePage = () => {
  return (
    <div>
      <img className='img-fluid img-thumbnail rounded mx-auto d-block img-responsive center-block ' src='src/assets/4314805.jpg'/>
      <h3>About Rentify</h3>
      <p>Rentify is a comprehensive web application designed to simplify the rental process for both property owners and potential renters. It offers a user-friendly interface where users can browse available rental properties, express interest, and interact with property listings through a liking system. Rentify aims to streamline the process of finding rental properties and connecting renters with property owners.</p>
      <h3>Key Features</h3>
      <ul>
        <li><b>Browse Properties:</b> Users can view detailed listings of available rental properties, including information about the location, area, number of bedrooms, and bathrooms.</li>
        <li><b>Like Properties: </b>Users can like properties they are interested in. Each property shows the total number of likes, helping to highlight popular listings.</li>
        <li><b>Express Interest:</b>With a simple button click, users can express interest in a property and view the contact details of the property owner.</li>
        <li><b>User Authentication:</b> Secure login and registration for users to manage their profile and interactions with the properties.</li>
       <li> <b>Responsive Design:</b> The application is designed to be fully responsive, providing an optimal viewing experience on both desktop and mobile devices.</li>
      </ul>
    </div>
  );
};

export default HomePage;
