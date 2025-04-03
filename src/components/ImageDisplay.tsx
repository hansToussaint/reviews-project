import { useState } from "react";
import { Box, Skeleton } from "@mui/material";

interface ImageDisplayProps {
  src: string;
  alt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        // height: "100%",
        border: "none",
        mb: 3,
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
        aspectRatio: {
          xs: "1.5 / 2",
          sm: "16 / 9",
          md: "4 / 2",
        },
      }}
    >
      {/* Show Skeleton while loading */}
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      )}

      {src && (
        <img
          src={src}
          alt={alt || "Review image"}
          onLoad={handleImageLoad}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: isLoaded ? "block" : "none",
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      )}
    </Box>
  );
};

export default ImageDisplay;
