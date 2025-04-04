import { Link } from "react-router";
import { Box, Typography, Skeleton, Divider } from "@mui/material";

import useReviews from "../hooks/useReviews";
import theme from "../styles/Theme";
import ImageWithSkeleton from "./ImageWithSkeleton";

interface CardCategoryHomePageProps {
  category: string;
}

const CardCategoryHomePage: React.FC<CardCategoryHomePageProps> = ({
  category,
}) => {
  const { reviews, isLoading, error } = useReviews();

  if (isLoading) {
    return (
      <Box sx={{ my: { xs: 2, md: 4 }, p: 2 }}>
        <Skeleton variant="rectangular" height={100} animation="wave" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        variant="body1"
        color="error"
        sx={{ my: { xs: 2, md: 4 }, p: 2 }}
      >
        Error loading reviews.
      </Typography>
    );
  }

  const filteredReviews = reviews?.filter(
    (review) => review.category.toLowerCase() === category.toLowerCase()
  );

  const latestReviews = filteredReviews
    ?.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 4);

  return (
    <Box sx={{ mt: { xs: 7, md: 15 }, mb: 5 }}>
      {/* Divider on top */}
      <Divider
        sx={{
          mb: 1.5,
          height: { xs: 2, md: 5 },
          bgcolor: theme.palette.common.black,
        }}
      />

      <Typography
        variant="h2"
        sx={{
          mb: { xs: 2, md: 4 },
          fontSize: { xs: "2.4rem", md: "3rem", sm: "2.7rem" },
        }}
      >
        {`${category} Reviews`}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
          gap: { xs: 3, md: 2 },
        }}
      >
        {latestReviews?.map((review) => (
          <Box
            key={review.id}
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              alignItems: { xs: "center", md: "flex-start" },
              gap: 2,
            }}
          >
            <ImageWithSkeleton
              src={review.image_urls?.[0] || undefined}
              alt={review.title}
              aspectRatio={16 / 9}
              sx={{
                width: { xs: 110, md: "100%" },
                height: { xs: 110, md: "auto" },
                flexShrink: 0,
              }}
            />
            <Box>
              <Link
                to={`/reviews/${review.id}`}
                style={{
                  textDecoration: "none",
                  color: theme.palette.common.black,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.4rem", md: "1.6rem" },
                  }}
                >
                  {review.title}
                </Typography>
              </Link>
              {/* showing published date only on mobile */}
              <Typography
                variant="body1"
                sx={{ display: { xs: "block", md: "none" }, mt: 1 }}
              >
                {new Date(review.created_at).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CardCategoryHomePage;
