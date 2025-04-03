import React, { useState } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { Review } from "../services/apiReviews";
import { Link } from "react-router";
import theme from "../styles/Theme";

interface CardReviewProps {
  review: Review;
}

const CardReview: React.FC<CardReviewProps> = ({ review }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        boxShadow: 2,
        overflow: "hidden",
        mb: 3,
        height: { xs: "auto", md: 200 },
      }}
    >
      {/* Image container */}
      <Box
        sx={{
          width: { xs: "100%", md: 200 },
          height: { xs: 200, md: "100%" },
          flexShrink: 0,
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#f0f0f0",
        }}
      >
        {/*showing the skeleton until the image loaded */}
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

        {review.image_urls && review.image_urls.length > 0 ? (
          <img
            src={review.image_urls[0]}
            alt={`Image for ${review.title}`}
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
          // Fallback if there is no image
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

      {/* review Content */}
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Link
          to={`/reviews/${review.id}`}
          style={{ textDecoration: "none", color: theme.palette.common.black }}
        >
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            {review.title}
          </Typography>
        </Link>

        <Typography
          variant="body1"
          sx={{
            mb: 1.5,
            fontSize: "1.3rem",
            "& span": {
              fontWeight: 600,
              color: theme.palette.common.black,
            },
          }}
        >
          <span>Published </span>
          <span style={{ margin: "0 6px" }}>•</span>
          {new Date(review.created_at).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {review.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardReview;
