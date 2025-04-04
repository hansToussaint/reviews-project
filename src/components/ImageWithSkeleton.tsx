import React, { useState } from "react";
import { Box, Skeleton, SxProps, Typography } from "@mui/material";

interface ImageWithSkeletonProps {
  src?: string;
  alt: string;
  aspectRatio?: number | string;
  sx?: SxProps;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  aspectRatio = 16 / 9,
  sx,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
        aspectRatio,
        ...sx, // to be able to use others styles
      }}
    >
      {/* Skeleton en position absolue */}
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}
      {src ? (
        <img
          src={src}
          alt={alt}
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
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e0e0e0",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            No image available
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ImageWithSkeleton;
