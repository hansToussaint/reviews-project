import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";

import theme from "../styles/Theme";

const SearchBar: React.FC = () => {
  const [active, setActive] = useState(false);

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
        maxWidth: 500,
        height: 45,
        bgcolor: active ? theme.palette.common.mainBackground : "transparent",
        "&:hover": { bgcolor: theme.palette.common.mainBackground },
        paddingX: 2,
        borderRadius: 0,
        transition: "background-color 0.3s ease",
      }}
    >
      <Search sx={{ color: theme.palette.common.black }} />

      <InputBase
        placeholder="Search a review..."
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          marginLeft: 1,
          width: "100%",
          transition: "width 0.3s ease",
          "& input": {
            padding: 0,
            fontSize: "1.3rem",
            fontWeight: 350,
          },
          "&::placeholder": {
            fontSize: "1.3rem",
            fontWeight: 350,
            color: theme.palette.text.secondary,
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
