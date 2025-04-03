import { IconButton } from "@mui/material";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  createBookmark,
  deleteBookmark,
  checkReviewBookmarked,
} from "../services/apiBookmarks";

interface BookmarkButtonProps {
  reviewId: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ reviewId }) => {
  const queryClient = useQueryClient();

  const { profile } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Fetch the bookmark status for the review
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!profile) return;

      try {
        const status = await checkReviewBookmarked(reviewId, profile.user_id);
        setIsBookmarked(status);
      } catch (error) {
        console.error("Error fetching bookmark status:", error);
      }
    };

    fetchBookmarkStatus();
  }, [reviewId, profile]);

  // Mutation to create a bookmark
  const { mutate: mutateCreateBookmark } = useMutation({
    mutationFn: (reviewId: number) =>
      createBookmark(reviewId, profile!.user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", profile!.user_id],
      });

      toast.success("Review added to bookmark");
      setIsBookmarked(true);
    },
  });

  // Mutation to delete a bookmark
  const { mutate: mutateDeleteBookmark } = useMutation({
    mutationFn: (reviewId: number) =>
      deleteBookmark(reviewId, profile!.user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", profile!.user_id],
      });

      toast.success("Review removed from bookmark");
      setIsBookmarked(false);
    },
  });

  // Toggle bookmark
  const toggleBookmark = () => {
    if (isBookmarked) {
      mutateDeleteBookmark(reviewId);
    } else {
      mutateCreateBookmark(reviewId);
    }
  };

  return (
    <IconButton
      disableRipple
      sx={{
        color: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
      }}
      onClick={toggleBookmark}
    >
      <span>{isBookmarked ? "saved" : "save"}</span>
      {isBookmarked ? (
        <Bookmark sx={{ fontSize: "1.5rem" }} />
      ) : (
        <BookmarkBorder sx={{ fontSize: "1.5rem" }} />
      )}
    </IconButton>
  );
};

export default BookmarkButton;
