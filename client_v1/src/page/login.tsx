// Login.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth:"100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #3b82f6, #9333ea)", // blue → purple
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 3,
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            Login to Your Account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}
          >
            {/* Username */}
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password */}
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 1,
                borderRadius: 2,
                textTransform: "none",
              }}
              fullWidth
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
