import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataDisplayTable from 'components/DataDisplayTable';

const columns = [
  { id: 'id', align: 'left', disablePadding: false, label: 'ID' },
  { id: 'name', align: 'left', disablePadding: true, label: 'Subject Name' },
  { id: 'description', align: 'left', disablePadding: false, label: 'Description' }
];

// Render the UsersTable
function Subjects() {
  const [rows, setRows] = useState([]); // State to store the fetched rows
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status

  useEffect(() => {
    // Fetch admins from the API
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost/uniTutor/backend/subjects/');
        const data = response.data;

        // Format the data to match the expected rows format for UsersTable
        const formattedRows = data.map((subject) => ({
          id: subject.subject_id,
          name: subject.subject_name,
          description: subject.description
        }));

        setRows(formattedRows); // Update the rows state with formatted data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error('Error fetching subject data:', err);
        setError('Failed to load subjects.');
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchSubjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
  }
  return (
    <Box>
      <Link href="#" underline="none">
        <Button variant="contained" color="primary">
          Add Subject
        </Button>
      </Link>
      <DataDisplayTable columns={columns} rows={rows} />
    </Box>
  );
}

export default Subjects;
