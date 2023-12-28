import React, { useState, useEffect } from 'react';
import axios from 'axios';
const EmployeeFormdatatable = () => {
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [editableFields, setEditableFields] = useState({ id: null, Name: '', Email: '', Phone: '', EmployeeId: '', Company: '', Designation:'' });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fetch-data');
      setFormSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleDelete = async (id) => {
    console.log('Deleting form with ID:', id);
    try {
      await axios.delete(`http://localhost:3000/delete-form/${id}`);
      fetchData();
    } catch (error) {
      console.error(`Error deleting data for ID ${id}:`, error.message);
    }
  };

  const handleEdit = (id, firstName, lastName, age, gender, medicalHistory) => {
    setEditableFields({
      id,
      Name: editableFields.id === id ? editableFields.Name : Name,
      Email: editableFields.id === id ? editableFields.Email : Email,
      Phone: editableFields.id === id ? editableFields.Phone : Phone,
      EmployeeId: editableFields.id === id ? editableFields.EmployeeId : EmployeeId,
      Company: editableFields.id === id ? editableFields.Company : Company,
      Designation:editableFields.id=== id ? editableFields.Designation : Designation,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/update-form/${id}`, {
        firstName: editableFields.firstName,
        lastName: editableFields.lastName,
        age: editableFields.age,
        gender: editableFields.gender,
        medicalHistory: editableFields.medicalHistory,
      });
      setEditableFields({ ...editableFields, id: null });
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };

  const handleInputChange = (e) => {
    setEditableFields({ ...editableFields, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Employee ID</th>
            <th>Company</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {formSubmissions.map((submission) => (
            <tr key={submission._id}>
              <td>{editableFields.id === submission._id ? <input type="text" name="Name" value={editableFields.Name} onChange={handleInputChange} /> : submission.Name}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="Email" value={editableFields.Email} onChange={handleInputChange} /> : submission.Email}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="Phone" value={editableFields.Phone} onChange={handleInputChange} /> : submission.Phone}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="EmployeeId" value={editableFields.EmployeeId} onChange={handleInputChange} /> : submission.EmployeeId}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="Company" value={editableFields.Company} onChange={handleInputChange} /> : submission.Company}</td>
              <td>{editableFields.id === submission._id ? <input type="text" name="Designation" value={editableFields.Designation} onChange={handleInputChange} /> : submission.Designation}</td>
              <td>
                {editableFields.id === submission._id ? (
                  <button className='btn' onClick={() => handleUpdate(submission._id)}>Update</button>
                ) : (
                  <>
                    <button className='btn' onClick={() => handleEdit(submission._id, submission.firstName, submission.lastName, submission.age, submission.gender, submission.medicalHistory)}>Edit</button>
                    <button className='btn2' onClick={() => handleDelete(submission._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeFormdatatable;
