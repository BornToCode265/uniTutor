import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataDisplayTable from 'components/DataDisplayTable';
import { backendUrl } from 'config';

const columns = [
  { id: 'id', align: 'left', disablePadding: false, label: 'ID' },
  { id: 'name', align: 'left', disablePadding: true, label: 'Program Name' },
  { id: 'description', align: 'left', disablePadding: false, label: 'Description' }
];

// Render the UsersTable
function Programs() {
  const [rows, setRows] = useState([]); // State to store the fetched rows
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status

  useEffect(() => {
    // Fetch admins from the API
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(backendUrl + '/programs/');
        const data = response.data;

        // Format the data to match the expected rows format for UsersTable
        const formattedRows = data.map((program) => ({
          id: program.program_id,
          name: program.program_name,
          description: program.description
        }));

        setRows(formattedRows); // Update the rows state with formatted data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error('Error fetching program data:', err);
        setError('Failed to load programs.');
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchPrograms();
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
          Add Program
        </Button>
      </Link>
      <DataDisplayTable columns={columns} rows={rows} />
    </Box>
  );
}

export default Programs;
