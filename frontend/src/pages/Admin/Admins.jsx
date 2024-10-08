import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataDisplayTable from 'components/DataDisplayTable';

import { backendUrl } from 'config';

const columns = [
  { id: 'id', align: 'left', disablePadding: false, label: 'ID' },
  { id: 'name', align: 'left', disablePadding: true, label: 'Name' },
  { id: 'email', align: 'left', disablePadding: false, label: 'Email' }
];

// Render the UsersTable with fetched data
function Admins() {
  const [rows, setRows] = useState([]); // State to store the fetched rows
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status

  useEffect(() => {
    // Fetch admins from the API
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(backendUrl + '/admins/');
        const data = response.data;

        // Format the data to match the expected rows format for UsersTable
        const formattedRows = data.map((admin) => ({
          id: admin.admin_id,
          name: admin.name,
          email: admin.email
        }));

        setRows(formattedRows); // Update the rows state with formatted data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to load admins.');
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchAdmins();
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

export default Admins;
