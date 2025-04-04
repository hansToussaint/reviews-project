import { useSearchParams } from "react-router";
import { Box, Typography, Divider } from "@mui/material";

import useReviews from "../hooks/useReviews";
import Spinner from "../components/Spinner";
import CardReview from "../components/CardReview";
import theme from "../styles/Theme";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const { reviews, isLoading, error } = useReviews();

  if (isLoading) {
    return <Spinner />;
  }

  if (!reviews || error) {
    return (
      <Typography variant="h2" color="error" sx={{ mt: 4 }}>
        Error loading reviews.
      </Typography>
    );
  }

  // Filter reviews with the query (search in title and content)
  const filteredReviews = reviews.filter(
    (review) =>
      review.title.toLowerCase().includes(query.toLowerCase()) ||
      review.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 750 }}>
      <Typography
        variant="h1"
        sx={{
          mb: { xs: 2, md: 4 },
          fontSize: { xs: "2rem", md: "3rem", sm: "2.5rem" },

          "& i": {
            color: theme.palette.common.secondaryText,
            fontWeight: 500,
          },
        }}
      >
        Results for <i>{query}</i>
      </Typography>

      <Divider
        sx={{
          mb: 4,
          height: { xs: 2, md: 5 },
          bgcolor: theme.palette.common.black,
        }}
      />

      {filteredReviews.length === 0 ? (
        <Typography variant="body1">
          No reviews found for your search.
        </Typography>
      ) : (
        filteredReviews.map((review) => (
          <CardReview key={review.id} review={review} />
        ))
      )}
    </Box>
  );
};

export default SearchPage;
