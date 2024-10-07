import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataDisplayTable from 'components/DataDisplayTable';

const columns = [
  { id: 'id', align: 'left', disablePadding: false, label: 'ID' },
  { id: 'name', align: 'left', disablePadding: true, label: 'Name' },
  { id: 'registration_number', align: 'center', disablePadding: true, label: 'Registration Number' },
  { id: 'email', align: 'left', disablePadding: false, label: 'Email' },
  { id: 'phone', align: 'left', disablePadding: false, label: 'Phone Number' }
];

// Render the UsersTable
function Students() {
  const [rows, setRows] = useState([]); // State to store the fetched rows
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status

  useEffect(() => {
    // Fetch admins from the API
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost/uniTutor/backend/students/');
        const data = response.data;

        // Format the data to match the expected rows format for UsersTable
        const formattedRows = data.map((student) => ({
          id: student.student_id,
          name: student.name,
          registration_number: student.registration_number,
          email: student.email,
          phone: student.phone_number
        }));

        setRows(formattedRows); // Update the rows state with formatted data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError('Failed to load students.');
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
  }
  return (
    <Box>
      <Link href="/register" underline="none">
        <Button variant="contained" color="primary">
          Add New User
        </Button>
      </Link>
      <DataDisplayTable columns={columns} rows={rows} />
    </Box>
  );
}

export default Students;
