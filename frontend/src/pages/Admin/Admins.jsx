import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DataDisplayTable from 'components/DataDisplayTable';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { backendUrl } from 'config';
import { DeleteOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Admins = () => {
  const [rows, setRows] = useState([]); // State to store the fetched rows
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status

  const [open, setOpen] = useState(false); // State to manage the delete confirmation modal
  const [selectedEmail, setSelectedEmail] = useState(null); // State to store selected email for deletion

  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    // Fetch admins from the API
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(backendUrl + '/admins/');
        const data = response.data;

        // Format the data to match the expected rows format for DataDisplayTable
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

  // Handle the delete action
  const handleDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/admins/?email=${selectedEmail}`);
      // Remove the deleted admin from the state
      setRows((prevRows) => prevRows.filter((row) => row.email !== selectedEmail));
      setOpen(false); // Close the dialog
      alert('Admin deleted successfully');
    } catch (err) {
      console.error('Error deleting admin:', err);
      alert('Failed to delete admin.');
    }
  };

  // Handle the open action (navigate to /admin/user)
  const handleOpen = (email) => {
    navigate(`/admin/user?email=${email}&userType=admin`);
  };

  // Handle opening of confirmation dialog
  const confirmDelete = (email) => {
    setSelectedEmail(email); // Set selected email
    setOpen(true); // Open the confirmation dialog
  };

  // Handle closing of dialog
  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  // Define columns here and use a function to create the actions column
  const columns = [
    { id: 'id', align: 'left', disablePadding: false, label: 'ID' },
    { id: 'name', align: 'left', disablePadding: true, label: 'Name' },
    { id: 'email', align: 'left', disablePadding: false, label: 'Email' },
    {
      id: 'actions',
      align: 'left',
      disablePadding: false,
      label: 'Actions',
      format: (row) => (
        <div>
          <IconButton aria-label="open" onClick={() => handleOpen(row.email)}>
            <FolderOpenOutlined />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => confirmDelete(row.email)}>
            <DeleteOutlined />
          </IconButton>
        </div>
      )
    }
  ];

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
  }

  return (
    <Box>
      <Link href="/register" underline="none">
        <Button variant="filled" color="primary">
          Add New User
        </Button>
      </Link>
      <DataDisplayTable columns={columns} rows={rows} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this admin? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="danger" variant="dashed">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Admins;
