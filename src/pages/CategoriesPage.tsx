import { useParams } from "react-router";
import { Box, Typography, Divider } from "@mui/material";
import useReviews from "../hooks/useReviews";
import Spinner from "../components/Spinner";
import CardReview from "../components/CardReview";
import theme from "../styles/Theme";

const CategoriesPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { reviews, isLoading, error } = useReviews();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner />
      </Box>
    );
  }

  if (!reviews || error) {
    return (
      <Typography variant="h2" color="error" sx={{ mt: 4 }}>
        Error loading reviews.
      </Typography>
    );
  }

  // filter reviews array
  const filteredReviews = category
    ? reviews.filter(
        (review) => review.category.toLowerCase() === category.toLowerCase()
      )
    : reviews;

  return (
    <Box sx={{ maxWidth: 750 }}>
      <Typography
        variant="h1"
        sx={{
          mb: { xs: 2, md: 4 },
          fontSize: { xs: "2rem", md: "4rem", sm: "3rem" },
        }}
      >
        {`${category} Reviews`}
      </Typography>

      <Divider
        sx={{
          mb: { xs: 1.5, md: 4 },
          height: { xs: 2, md: 5 },
          bgcolor: theme.palette.common.black,
        }}
      />
      {filteredReviews.length === 0 ? (
        <Typography variant="body1">
          No reviews found in this category.
        </Typography>
      ) : (
        filteredReviews.map((review) => (
          <CardReview key={review.id} review={review} />
        ))
      )}
    </Box>
  );
};

export default CategoriesPage;
