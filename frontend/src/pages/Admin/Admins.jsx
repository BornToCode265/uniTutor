import UsersTable from './UsersTable';

const columns = [
  { id: 'id', align: 'left', disablePadding: false, label: 'ID' },
  { id: 'name', align: 'left', disablePadding: true, label: 'Name' },
  { id: 'employeeId', align: 'left', disablePadding: false, label: 'Employee ID' },
  { id: 'email', align: 'left', disablePadding: false, label: 'Email' }
];

const rows = [
  { id: 1, name: 'John Doe', employeeId: 'E001', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', employeeId: 'E002', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', employeeId: 'E003', email: 'alice@example.com' },
  { id: 4, name: 'Bob Brown', employeeId: 'E004', email: 'bob@example.com' },
  { id: 5, name: 'Charlie White', employeeId: 'E005', email: 'charlie@example.com' }
];

// Render the UsersTable
function Admins() {
  return <UsersTable columns={columns} rows={rows} />;
}

export default Admins;
