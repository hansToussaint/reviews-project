import React, { useState } from "react";
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

// recursive function to count all comments (and replies)
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

  //   state to know the comment that where deleting or where creating to show a message
  const [pendingReplyParentId, setPendingReplyParentId] = useState<
    string | null
  >(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // Sort top-level comments by created_at descending (most recent first)
  const sortedComments = [...comments].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Mutation for creating a comment (or reply)
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
      //   toast.success("Comment created successfully");
    },
    onError: (error) => {
      toast.error("Error creating comment");
      console.error(error);
    },
    onSettled: () => {
      setPendingReplyParentId(null);
    },
  });

  // Mutation for deleting a comment
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
      //   toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while deleting the comment");
      console.error(error);
    },
    onSettled: () => {
      setPendingDeleteId(null);
    },
  });

  // Mutation for like/dislike
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

  const handleDeleteComment = (data: { commentId: string; userId: string }) => {
    setPendingDeleteId(data.commentId);

    mutateDeleteComment(data);
  };

  return (
    <Box sx={{ mt: 4, maxWidth: 750 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {getTotalCount(sortedComments)} Comments
      </Typography>
      <Divider />

      {/* New comment input */}
      <Box sx={{ mt: 2 }}>
        <CommentInput
          reviewId={reviewId}
          onSubmit={(content, reviewId, parentId) => {
            if (parentId) {
              setPendingReplyParentId(parentId);
            }

            createCommentMutate.mutate({
              reviewId,
              parentId,
              content,
              user_id: user!.user_id,
            });
          }}
        />
      </Box>

      {/* List of comments */}
      <Box sx={{ mt: 4 }}>
        {/* just give a hink that is creating */}
        {!pendingReplyParentId && createCommentMutate.isPending && (
          <Typography variant="body2" color="gray">
            Comment creating...
          </Typography>
        )}

        {sortedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            reviewId={reviewId}
            onReplySubmit={(content, reviewId, parentId) => {
              if (parentId) {
                setPendingReplyParentId(parentId);
              }

              createCommentMutate.mutate({
                reviewId,
                parentId,
                content,
                user_id: user!.user_id,
              });
            }}
            onToggleLike={(data) => mutateToggleLike(data)}
            onDeleteComment={handleDeleteComment}
            isLoadingDeleteComment={
              pendingDeleteId === comment.id ? true : false
            }
            isLoadingCreateComment={
              pendingReplyParentId === comment.id ? true : false
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default CommentsSection;
