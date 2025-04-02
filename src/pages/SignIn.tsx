import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in", { email, password });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Sign In
      </Typography>
      <TextField
        label="Email"
        type="email"
        required
        slotProps={{ inputLabel: { required: false } }}
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="small"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "rgba(0, 0, 0, 0.23)" },
            "&:hover fieldset": { borderColor: "rgba(0, 0, 0, 0.23)" },
            "&.Mui-focused fieldset": { borderColor: "rgba(0, 0, 0, 0.23)" },
          },
        }}
      />
      <TextField
        label="Password"
        type="password"
        required
        slotProps={{ inputLabel: { required: false } }}
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size="small"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "rgba(0, 0, 0, 0.23)" },
            "&:hover fieldset": { borderColor: "rgba(0, 0, 0, 0.23)" },
            "&.Mui-focused fieldset": { borderColor: "rgba(0, 0, 0, 0.23)" },
          },
        }}
      />
      <Button
        disableRipple
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          width: "fit-content",
        }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default SignIn;
