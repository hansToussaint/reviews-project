import { useState } from "react";
import toast from "react-hot-toast";

import { Box, TextField, Button, Typography } from "@mui/material";
import { useSignUp } from "../hooks/useAuthActions";
import SpinnerMini from "../components/SpinnerMini";

const SignUp: React.FC = () => {
  const { isLoading: isLoadingSignUp, mutateSignUp } = useSignUp();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.length < 6) {
      toast.error("Email must be at least 6 characters long");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    mutateSignUp({ email, password, username });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Sign Up
      </Typography>

      <TextField
        label="Name"
        required
        slotProps={{ inputLabel: { required: false } }}
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        {isLoadingSignUp ? <SpinnerMini /> : "Sign Up"}
      </Button>
    </Box>
  );
};

export default SignUp;
