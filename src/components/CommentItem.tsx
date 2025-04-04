import { useState } from "react";
import { Box, Typography, IconButton, Button, Collapse } from "@mui/material";
import toast from "react-hot-toast";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import CommentInput from "./CommentInput";
import UserAvatar from "./UserAvatar";
import theme from "../styles/Theme";
import { Comment } from "../services/apiComments";
import useProfile from "../hooks/useProfile";
import { useAuth } from "../context/AuthContext";

interface CommentItemProps {
  comment: Comment;
  reviewId: string;
  onReplySubmit: (
    content: string,
    reviewId: string,
    parentId?: string | null
  ) => void;
  onToggleLike: (data: {
    user_id: string;
    comment_id: string;
    type: 1 | -1;
  }) => void;
  onDeleteComment: (data: { commentId: string; userId: string }) => void;
  isLoadingDeleteComment?: boolean;
  isLoadingCreateComment?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  reviewId,
  onReplySubmit,
  onToggleLike,
  onDeleteComment,
  isLoadingDeleteComment,
  isLoadingCreateComment,
}) => {
  const { profile: currentUser } = useAuth();
  const { profile, isLoading: isProfileLoading } = useProfile(comment.user_id);

  const [showReplyInput, setShowReplyInput] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // Optimistic counters for immediate update
  const [optimisticLikes, setOptimisticLikes] = useState(
    comment.total_likes || 0
  );
  const [optimisticDislikes, setOptimisticDislikes] = useState(
    comment.total_dislikes || 0
  );

  const handleToggleLike = (type: 1 | -1) => {
    if (!currentUser) {
      toast.error("You need to sign in first to perform this action.");
      return;
    }

    if (type === 1) {
      if (liked) {
        setLiked(false);
        setOptimisticLikes((prev) => prev - 1);
        onToggleLike({
          user_id: currentUser.user_id,
          comment_id: comment.id,
          type: 1,
        });
        return;
      } else {
        setLiked(true);
        if (disliked) {
          setDisliked(false);
          setOptimisticDislikes((prev) => prev - 1);
        }
        setOptimisticLikes((prev) => prev + 1);
        onToggleLike({
          user_id: currentUser.user_id,
          comment_id: comment.id,
          type: 1,
        });
      }
    } else {
      if (disliked) {
        setDisliked(false);
        setOptimisticDislikes((prev) => prev - 1);
        onToggleLike({
          user_id: currentUser.user_id,
          comment_id: comment.id,
          type: -1,
        });
        return;
      } else {
        setDisliked(true);
        if (liked) {
          setLiked(false);
          setOptimisticLikes((prev) => prev - 1);
        }
        setOptimisticDislikes((prev) => prev + 1);
        onToggleLike({
          user_id: currentUser.user_id,
          comment_id: comment.id,
          type: -1,
        });
      }
    }
  };

  const handleReplySubmit = (
    content: string,
    reviewId: string,
    parentId?: string | null
  ) => {
    onReplySubmit(content, reviewId, parentId);

    setShowReplyInput(false);
  };

  const handleDelete = async () => {
    await onDeleteComment({
      commentId: comment.id,
      userId: currentUser!.user_id,
    });
  };

  return (
    <Box sx={{ display: "flex", mt: 2 }}>
      {/* if deleting a comment, show something */}
      {isLoadingDeleteComment ? (
        <Typography variant="body1">Comment is deleting...</Typography>
      ) : (
        <>
          <UserAvatar
            src={profile?.avatar_url}
            name={profile?.username || "User"}
          />

          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {isProfileLoading ? "Loading..." : profile?.username}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.9rem" }}
              >
                {new Date(comment.created_at).toLocaleString()}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mt: 1, whiteSpace: "pre-line" }}>
              {comment.content}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              {/* Like a comment */}
              <IconButton
                disableRipple
                size="small"
                onClick={() => handleToggleLike(1)}
                sx={{
                  transform: liked ? "scale(1.2)" : "scale(1)",
                  color: liked ? "#40b36a" : "inherit",
                }}
              >
                <ThumbUpOutlinedIcon fontSize="small" />

                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {optimisticLikes}
                </Typography>
              </IconButton>

              {/* Dislike a comment */}
              <IconButton
                disableRipple
                size="small"
                onClick={() => handleToggleLike(-1)}
                sx={{
                  transform: disliked ? "scale(1.2)" : "scale(1)",
                  color: disliked ? theme.palette.error.main : "inherit",
                }}
              >
                <ThumbDownOutlinedIcon fontSize="small" />

                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {optimisticDislikes}
                </Typography>
              </IconButton>

              {/* Reply to a comment */}
              {currentUser && comment.parent_id === null && (
                <Button
                  disableRipple
                  size="small"
                  startIcon={<ReplyOutlinedIcon />}
                  onClick={() => setShowReplyInput(!showReplyInput)}
                  sx={{ color: theme.palette.common.secondaryText }}
                >
                  Reply
                </Button>
              )}

              {currentUser && comment.user_id === currentUser.user_id && (
                <Button
                  disableRipple
                  size="small"
                  onClick={handleDelete}
                  sx={{ color: "red", ml: 1 }}
                >
                  Delete
                </Button>
              )}
            </Box>

            {currentUser && (
              <Collapse in={showReplyInput}>
                <Box sx={{ mt: 1 }}>
                  {/* if this comment receive a new reply, show an action message */}
                  {isLoadingCreateComment ? (
                    <Typography variant="body1">Creating reply...</Typography>
                  ) : (
                    <CommentInput
                      reviewId={reviewId}
                      parentId={comment.id}
                      onSubmit={handleReplySubmit}
                      placeholder="Write your reply..."
                    />
                  )}
                </Box>
              </Collapse>
            )}

            {/* Render replies */}
            {comment.replies &&
              comment.replies
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((reply) => (
                  <Box key={reply.id} sx={{ ml: 1, mt: 2 }}>
                    <CommentItem
                      comment={reply}
                      reviewId={reviewId}
                      onReplySubmit={onReplySubmit}
                      onToggleLike={onToggleLike}
                      onDeleteComment={onDeleteComment}
                    />
                  </Box>
                ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default CommentItem;
