import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, InputBase, IconButton } from "@mui/material";
import { Search, Close } from "@mui/icons-material";

import theme from "../styles/Theme";

interface MobileSearchBarProps {
  onClose: () => void;
}

const MobileSearchBar: React.FC<MobileSearchBarProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      // Redirect with the query param
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: theme.palette.common.mainBackground,
        borderRadius: 1,
        px: 2,
        width: "100%",
      }}
    >
      <Search sx={{ mr: 1 }} />
      <InputBase
        autoFocus
        placeholder="Search a review..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          flexGrow: 1,
          "& input": {
            fontWeight: 350,
          },
          "&::placeholder": {
            fontWeight: 350,
            color: theme.palette.text.secondary,
          },
        }}
      />
      <IconButton onClick={onClose} sx={{ p: 0 }}>
        <Close />
      </IconButton>
    </Box>
  );
};

export default MobileSearchBar;
