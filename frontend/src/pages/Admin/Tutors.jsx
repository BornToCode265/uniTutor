import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import DataDisplayTable from 'components/DataDisplayTable';
import { backendUrl } from 'config';
import { IconButton } from '@mui/material';
import { DeleteOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Button } from 'antd';

function Tutors() {
  const [rows, setRows] = useState([]); // State to store the fetched rows
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status

  const [open, setOpen] = useState(false); // State to manage the delete confirmation modal
  const [selectedEmail, setSelectedEmail] = useState(null); // State to store selected email for deletion

  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    // Fetch tutors from the API
    const fetchTutors = async () => {
      try {
        const response = await axios.get(backendUrl + '/tutors/');
        const data = response.data;

        // Format the data to match the expected rows format for DataDisplayTable
        const formattedRows = data.map((tutor) => ({
          id: tutor.tutor_id,
          name: tutor.name,
          email: tutor.email,
          phone: tutor.phone_number
        }));

        setRows(formattedRows); // Update the rows state with formatted data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error('Error fetching tutor data:', err);
        setError('Failed to load tutors.');
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchTutors();
  }, []);

  // Handle the delete action
  const handleDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/tutors/?email=${selectedEmail}`);
      // Remove the deleted tutor from the state
      setRows((prevRows) => prevRows.filter((row) => row.email !== selectedEmail));
      setOpen(false); // Close the dialog
      alert('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user.');
    }
  };

  // Handle the open action (navigate to /admin/user)
  const handleOpen = (id) => {
    navigate(`/admin/user?user_id=${id}&userType=tutor`);
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

  const columns = [
    { id: 'id', align: 'left', disablePadding: false, label: 'ID' },
    { id: 'name', align: 'left', disablePadding: true, label: 'Name' },
    { id: 'email', align: 'left', disablePadding: false, label: 'Email' },
    { id: 'phone', align: 'left', disablePadding: false, label: 'Phone Number' },
    {
      id: 'actions',
      align: 'left',
      disablePadding: false,
      label: 'Actions',
      format: (row) => (
        <div>
          <IconButton aria-label="open" onClick={() => handleOpen(row.id)}>
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
          <DialogContentText>Are you sure you want to delete this tutor? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="dashed" color="danger">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Tutors;
