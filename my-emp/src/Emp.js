import React, { useState } from 'react';
import './Emp.css';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    company: '',
    designation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3001/api/submitForm', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});

          

      const result = await response.text();
      console.log(result);

      // Reset the form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        employeeId: '',
        company: '',
        designation: '',
      });
    } catch (error) {
      console.error('Error submitting Form:', error);
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone :
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Employee ID:
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Company:
          <input type="text" name="company" value={formData.company} onChange={handleChange} required />
        </label>
        <label>
          Designation:
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
