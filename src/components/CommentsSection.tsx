import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Divider, Typography } from "@mui/material";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import {
  createComment,
  deleteComment,
  toggleLikeDislike,
  Comment,
} from "../services/apiComments";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

// recursive fonction to count all comments, and also replies
const getTotalCount = (comments: Comment[]): number =>
  comments.reduce(
    (acc, comment) =>
      acc + 1 + (comment.replies ? getTotalCount(comment.replies) : 0),
    0
  );

interface CommentsSectionProps {
  comments: Comment[];
  reviewId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  reviewId,
}) => {
  const queryClient = useQueryClient();
  const { profile: user } = useAuth();

  //   add a comment
  const createCommentMutate = useMutation({
    mutationFn: (data: {
      reviewId: string;
      parentId?: string | null;
      content: string;
      user_id: string;
    }) =>
      createComment({
        review_id: data.reviewId,
        parent_id: data.parentId || null,
        content: data.content,
        user_id: data.user_id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", reviewId] });
      toast.success("Comment created successfully");
    },
    onError: (error) => {
      toast.error("Error creating comment");
      console.error(error);
    },
  });

  //   delete a comment
  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: ({
      commentId,
      userId,
    }: {
      commentId: string;
      userId: string;
    }) => deleteComment(commentId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", reviewId] });
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while deleting the comment");
      console.error(error);
    },
  });

  //   like and dislike
  const { mutate: mutateToggleLike } = useMutation({
    mutationFn: (data: { user_id: string; comment_id: string; type: 1 | -1 }) =>
      toggleLikeDislike(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", reviewId] });
    },
    onError: (error) => {
      toast.error("Error updating reaction");
      console.error(error);
    },
  });

  return (
    <Box sx={{ mt: 4, maxWidth: 750 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {getTotalCount(comments)} Comments
      </Typography>
      <Divider />

      {/* New comment */}
      <Box sx={{ mt: 2 }}>
        <CommentInput
          reviewId={reviewId}
          onSubmit={(content, reviewId, parentId) =>
            createCommentMutate.mutate({
              reviewId,
              parentId,
              content,
              user_id: user!.user_id,
            })
          }
        />
      </Box>

      {/* List of comments */}
      <Box sx={{ mt: 4 }}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            reviewId={reviewId}
            onReplySubmit={(content, reviewId, parentId) =>
              createCommentMutate.mutate({
                reviewId,
                parentId,
                content,
                user_id: user!.user_id,
              })
            }
            onToggleLike={(comment) => mutateToggleLike(comment)}
            onDeleteComment={(comment) => mutateDeleteComment(comment)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CommentsSection;
