import { Box, InputBase, IconButton } from "@mui/material";
import { Search, Close } from "@mui/icons-material";

import theme from "../styles/Theme";

interface MobileSearchBarProps {
  onClose: () => void;
}

const MobileSearchBar: React.FC<MobileSearchBarProps> = ({ onClose }) => {
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
