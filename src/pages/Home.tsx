import { useState } from "react";
import { Box, Typography } from "@mui/material";

import theme from "../styles/Theme";
import CardCategoryHomePage from "../components/CardCategoryHomePage";

const Home: React.FC = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Box>
      {/* Main Image with Blur Effect */}
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          maxHeight: "80vh",
          position: "relative",
          background: `url(/mainImage.jpg) center/cover no-repeat`,
          filter: isImageLoaded ? "none" : "blur(10px)",
          transition: "filter 1s ease-in-out",
        }}
      >
        <img
          src="/mainImage.jpg"
          alt="Main banner"
          onLoad={() => setIsImageLoaded(true)}
          style={{
            width: "100%",
            display: "block",
            objectFit: "cover",
            visibility: isImageLoaded ? "visible" : "hidden",
          }}
        />
      </Box>

      {/* Text */}
      <Box sx={{ textAlign: "center", my: 3 }}>
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 700,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          Each review is a voice, each voice helps shape the world
        </Typography>
      </Box>

      {/* Section with categories */}
      <CardCategoryHomePage category="Beauty" />
      <CardCategoryHomePage category="Cars" />
      <CardCategoryHomePage category="Electronics" />
    </Box>
  );
};

export default Home;
