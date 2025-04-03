import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useSignIn } from "../hooks/useAuthActions";
import SpinnerMini from "../components/SpinnerMini";

const SignIn: React.FC = () => {
  const { isLoading: isLoadingSignIn, mutateSignIn } = useSignIn();

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("12345678");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutateSignIn({ email, password });
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
        {isLoadingSignIn ? <SpinnerMini /> : "Sign In"}
      </Button>
    </Box>
  );
};

export default SignIn;
