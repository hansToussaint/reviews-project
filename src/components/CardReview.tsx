import { Box, Typography, useMediaQuery } from "@mui/material";

import { Review } from "../services/apiReviews";
import { Link } from "react-router";
import theme from "../styles/Theme";
import ImageWithSkeleton from "./ImageWithSkeleton";

interface CardReviewProps {
  review: Review;
}

const CardReview: React.FC<CardReviewProps> = ({ review }) => {
  // for responsive image
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  // const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  let aspectRatio = "2 / 1"; // xs par défaut

  if (isMdUp) {
    aspectRatio = "3 / 3";
  }
  // else if (isSmUp) {
  //   aspectRatio = "16 / 9";
  // }

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
      <Box sx={{ width: { xs: "100%", md: 200 }, flexShrink: 0 }}>
        <ImageWithSkeleton
          src={
            review.image_urls && review.image_urls.length > 0
              ? review.image_urls[0]
              : undefined
          }
          alt={`Image for ${review.title}`}
          aspectRatio={aspectRatio}
        />
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
