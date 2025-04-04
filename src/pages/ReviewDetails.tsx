import { useParams } from "react-router";
import { Box, Typography, useMediaQuery } from "@mui/material";

import useReview from "../hooks/useReview";
import useComments from "../hooks/useComments";
import Spinner from "../components/Spinner";
import UserAvatar from "../components/UserAvatar";
import ReviewRating from "../components/ReviewRating";
import CommentsSection from "../components/CommentsSection";
import theme from "../styles/Theme";
import useProfile from "../hooks/useProfile";
import BookmarkButton from "../components/BookmarkButton";
import ImageWithSkeleton from "../components/ImageWithSkeleton";

const ReviewDetails: React.FC = () => {
  const { reviewId } = useParams<{ reviewId: string }>();

  const {
    review,
    isLoading: isLoadingReview,
    error: reviewError,
  } = useReview(reviewId!);

  // get comments
  const {
    isLoading: isLoadingComments,
    comments,
    error: commentsError,
  } = useComments(reviewId!);

  // Get the info about the author
  const { profile: authorProfile, isLoading: isAuthorLoading } = useProfile(
    review?.user_id ?? ""
  );

  // responsive
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  let aspectRatio = "1.8 / 2";

  if (isMdUp) {
    aspectRatio = "4 / 2";
  } else if (isSmUp) {
    aspectRatio = "16 / 9";
  }

  //
  if (isLoadingReview || isLoadingComments) {
    return <Spinner />;
  }

  if (!review) return <p>Review is not found</p>;

  if (reviewError || commentsError) {
    return (
      <Typography variant="h2" color="error" sx={{ mt: 4 }}>
        Error loading review.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography
        variant="h1"
        sx={{
          maxWidth: 750,
          mb: { xs: 2, md: 4 },
          fontSize: { xs: "2rem", md: "4rem", sm: "3rem" },
        }}
      >
        {review.title}
      </Typography>

      {/* Publish Date */}
      <Typography
        variant="body1"
        sx={{ mb: 2, color: theme.palette.common.secondaryText }}
      >
        Published{" "}
        {new Date(review.created_at).toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </Typography>

      {/* Review Image */}
      {review.image_urls && review.image_urls.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <ImageWithSkeleton
            src={review.image_urls[0]}
            alt="Review image"
            aspectRatio={aspectRatio}
          />
        </Box>
      )}

      {/* Author and rating */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isAuthorLoading ? (
            <Typography variant="subtitle2">Loading...</Typography>
          ) : (
            <>
              <UserAvatar
                src={authorProfile?.avatar_url}
                name={authorProfile?.username || review.user_id}
                size={40}
              />
              <Typography variant="h5">
                {authorProfile?.username || review.user_id}
              </Typography>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
          }}
        >
          <BookmarkButton reviewId={Number(reviewId)} />

          <ReviewRating reviewId={Number(reviewId)} />
        </Box>
      </Box>

      {/* Review Content */}
      <Typography
        variant="body1"
        sx={{
          mt: 5,
          mb: 6,
          lineHeight: 1.6,
          maxWidth: 750,
          whiteSpace: "pre-line",
        }}
      >
        {review.content}
      </Typography>

      {/* Comments section  */}
      <CommentsSection comments={comments || []} reviewId={reviewId!} />
    </Box>
  );
};

export default ReviewDetails;
