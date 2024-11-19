import React, { useState, useEffect } from 'react';
import client from '../utils/graphQLClient';
import { Button, Modal } from 'react-bootstrap';

// Define the GraphQL query
const GET_FORM_FIELDS = `
  query {
    allArticles {
      firstName
      companyEmail
      companyName
      locationPreference
      spaceRequirement
    }
    _allArticlesMeta {
      count
    }
  }
`;

const InputModal = ({ show, handleClose }) => {
  // Set up state for form data and loading state
  const [formData, setFormData] = useState({
    firstName: '',
    companyEmail: '',
    companyName: '',
    locationPreference: '',
    spaceRequirement: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data using GraphQLClient
  const fetchData = async () => {

    try {
      const data = await client.request(GET_FORM_FIELDS);
      console.log(data); // Log the response to see the structure of the data
      const articleData = data.allArticles[0] || {};
      setFormData({
        firstName: articleData.firstName || '',
        companyEmail: articleData.companyEmail || '',
        companyName: articleData.companyName || '',
        locationPreference: articleData.locationPreference || '',
        spaceRequirement: articleData.spaceRequirement || '',
      });
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err);
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Handle form field change
  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Logic to submit form data (e.g., to your backend)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dynamic Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="form-group">
            <label htmlFor="firstName">
              First Name <span className="astrisk">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              required
              onChange={(e) => handleFieldChange('firstName', e.target.value)}
            />
          </div>

          {/* Company Email Field */}
          <div className="form-group">
            <label htmlFor="companyEmail">
              Company Email <span className="astrisk">*</span>
            </label>
            <input
              type="email"
              id="companyEmail"
              name="companyEmail"
              className="form-control"
              value={formData.companyEmail}
              required
              onChange={(e) => handleFieldChange('companyEmail', e.target.value)}
            />
          </div>

          {/* Company Name Field */}
          <div className="form-group">
            <label htmlFor="companyName">
              Company Name <span className="astrisk">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="form-control"
              value={formData.companyName}
              required
              onChange={(e) => handleFieldChange('companyName', e.target.value)}
            />
          </div>

          {/* Location Preference Field */}
          <div className="form-group">
            <label htmlFor="locationPreference">
              Location Preference <span className="astrisk">*</span>
            </label>
            <input
              type="text"
              id="locationPreference"
              name="locationPreference"
              className="form-control"
              value={formData.locationPreference}
              required
              onChange={(e) => handleFieldChange('locationPreference', e.target.value)}
            />
          </div>

          {/* Space Requirement Field */}
          <div className="form-group">
            <label htmlFor="spaceRequirement">
              Space Requirement
            </label>
            <textarea
              id="spaceRequirement"
              name="spaceRequirement"
              className="form-control"
              value={formData.spaceRequirement}
              onChange={(e) => handleFieldChange('spaceRequirement', e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default InputModal;
