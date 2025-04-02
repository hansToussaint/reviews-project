import { useParams } from "react-router";
import useComments from "../hooks/useComments";
import Spinner from "../components/Spinner";
import { Typography } from "@mui/material";
import CommentsSection from "../components/CommentsSection";

const ReviewDetails: React.FC = () => {
  const { reviewId } = useParams<{ reviewId: string }>();

  const {
    isLoading: isLoadingComments,
    comments,
    error,
  } = useComments(reviewId);

  if (isLoadingComments) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Typography variant="h2" color="error" sx={{ mt: 4 }}>
        Error loading comments.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Review Details
      </Typography>
      {/* Affichage des détails de la review... */}
      <CommentsSection comments={comments || []} reviewId={reviewId!} />
    </>
  );
};

export default ReviewDetails;
