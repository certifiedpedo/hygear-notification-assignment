import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { fetchUsersApi, createUserApi, type User } from "../services/api";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "user", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsersApi();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadUsers();
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name required";
    if (!formData.email) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password required";
    else if (formData.password.length < 6) newErrors.password = "Min 6 chars";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const newUser = await createUserApi(formData);
      setUsers((prev) => [...prev, newUser]);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => setUsers(users.filter(u => u.id !== params.row.id))}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%", p: 2, display: "flex", flexDirection: "column" }}>
      <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
        <Typography variant="h5">User Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>Add User</Button>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          sx={{ border: "none" }}
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create User</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;