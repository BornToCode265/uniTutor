import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DataDisplayTable from 'components/DataDisplayTable';

const columns = [
  { id: 'id', align: 'left', disablePadding: false, label: 'ID' },
  { id: 'name', align: 'left', disablePadding: true, label: 'Name' },
  { id: 'registrationNumber', align: 'left', disablePadding: false, label: 'Registration Number' },
  { id: 'email', align: 'left', disablePadding: false, label: 'Email' }
];

const rows = [
  { id: 1, name: 'John Doe', registrationNumber: 'BEDICT001', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', registrationNumber: 'BICT002', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', registrationNumber: 'BEDL003', email: 'alice@example.com' },
  { id: 4, name: 'Bob Brown', registrationNumber: 'BSDWR004', email: 'bob@example.com' },
  { id: 5, name: 'Charlie White', registrationNumber: 'BSDS005', email: 'charlie@example.com' },
  { id: 6, name: 'Emily Davis', registrationNumber: 'BEDICT006', email: 'emily@example.com' },
  { id: 7, name: 'Michael Miller', registrationNumber: 'BICT007', email: 'michael@example.com' },
  { id: 8, name: 'Sarah Wilson', registrationNumber: 'BEDL008', email: 'sarah@example.com' },
  { id: 9, name: 'David Brown', registrationNumber: 'BSDWR009', email: 'david@example.com' },
  { id: 10, name: 'Linda Taylor', registrationNumber: 'BSDS010', email: 'linda@example.com' }
];

// Render the UsersTable
function Students() {
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
