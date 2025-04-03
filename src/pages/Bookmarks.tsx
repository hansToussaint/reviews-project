import { Box, Typography, Divider } from "@mui/material";

import { useAuth } from "../context/AuthContext";
import useBookmarks from "../hooks/useBookmarks";
import Spinner from "../components/Spinner";
import CardReview from "../components/CardReview";
import theme from "../styles/Theme";

const BookmarkPage: React.FC = () => {
  const { profile } = useAuth();
  const userId = profile?.user_id || "";
  const { bookmarks, isLoading, error } = useBookmarks(userId);

  if (error) {
    return (
      <Typography
        variant="h2"
        color="error"
        sx={{ mt: 4, fontSize: { xs: "2rem", md: "4rem" } }}
      >
        Error loading bookmarks.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 750 }}>
      {/* Title */}
      <Typography
        variant="h1"
        sx={{
          mb: { xs: 2, md: 4 },
          fontSize: { xs: "2rem", md: "4rem", sm: "3rem" },
        }}
      >
        Your saved reviews are here
      </Typography>

      {/* Divider */}
      <Divider
        sx={{
          mb: { xs: 1.5, md: 4 },
          height: { xs: 2, md: 5 },
          bgcolor: theme.palette.common.black,
        }}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {/* Mssage if no bookmarks */}
          {bookmarks.length === 0 ? (
            <Typography variant="body1">
              You haven't saved any reviews yet.
            </Typography>
          ) : (
            <Box>
              {bookmarks.map((bookmark) => (
                <CardReview key={bookmark.review_id} review={bookmark.review} />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default BookmarkPage;
