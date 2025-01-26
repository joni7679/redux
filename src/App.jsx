import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, fetchData } from './Reducer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [name, Setname] = useState('');
  const [age, Setage] = useState('');
  let students = useSelector((state) => state.studentSdata);
  console.log(students);


  // Form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !age) {
      toast.error('Please fill all the fields');
      return;
    }

    if (addStudent({ name: name, age: stuage })) {
      toast.success('Student added successfully');
      Setname('');
      Setage('');
    }
    else {
      toast.error('Something went wrong');
    }


  };

  // Delete student
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
      toast.success('Student deleted successfully');
    }
    // Fetch data after deletion
    fetchData();
  };

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer />
      <div>
        <h1>Redux Form Data Add</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => Setname(e.target.value)}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => Setage(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <h1>Student Data</h1>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students && students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>
                    <button onClick={() => console.log(`Delete ${student.id}`)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No data available</td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </>
  );
}
