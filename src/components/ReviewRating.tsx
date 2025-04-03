import React, { useEffect, useState } from "react";
import { Box, Rating, Typography, CircularProgress } from "@mui/material";
import useRatings from "../hooks/useRatings";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

interface ReviewRatingProps {
  reviewId: number;
}

const ReviewRating: React.FC<ReviewRatingProps> = ({ reviewId }) => {
  const { ratingData, isLoading, error, rateMutate } = useRatings(reviewId);
  const { profile } = useAuth();

  const [userRating, setUserRating] = useState<number>(
    ratingData?.user_rating || 0
  );

  useEffect(() => {
    // console.log("Rating data:", ratingData);
    if (ratingData?.user_rating !== undefined) {
      setUserRating(ratingData.user_rating);
    }
  }, [ratingData]);

  const handleRatingChange = (
    _event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    if (!profile) {
      toast.error("Please sign in first to rate");
      return;
    }
    if (newValue !== null) {
      setUserRating(newValue);
      rateMutate(newValue);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CircularProgress size={24} color="primary" />
        <Typography variant="body2" sx={{ ml: 1 }}>
          Loading rating...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body2" color="error">
        Error loading rating.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "center",
        gap: { xs: 1, md: 2 },
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Rating
          value={ratingData?.average_rating || 0}
          precision={0.5}
          readOnly
          size="large"
        />
        <Typography variant="caption" sx={{ ml: 1 }}>
          {ratingData?.rating_count} votes
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography variant="subtitle1">Your rating:</Typography>
        {profile ? (
          <Rating
            value={userRating}
            onChange={handleRatingChange}
            precision={0.5}
            size="large"
          />
        ) : (
          <Typography variant="body2" color="text.secondary" mt={0.3}>
            Sign in to rate
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ReviewRating;
