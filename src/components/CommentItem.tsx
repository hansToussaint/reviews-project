import React, { useState } from "react";
import { Box, Typography, IconButton, Button, Collapse } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import CommentInput from "./CommentInput";
import UserAvatar from "./UserAvatar";
import theme from "../styles/Theme";
import { Comment } from "../services/apiComments";
import useProfile from "../hooks/useProfile";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

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
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  reviewId,
  onReplySubmit,
  onToggleLike,
  onDeleteComment,
}) => {
  const { profile: user } = useAuth();
  const { profile, isLoading: isProfileLoading } = useProfile(comment.user_id);

  const [showReplyInput, setShowReplyInput] = useState(false);

  return (
    <Box sx={{ display: "flex", mt: 2 }}>
      <UserAvatar
        src={profile?.avatar_url}
        name={profile?.username || "User"}
      />

      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {isProfileLoading ? "Loading..." : profile?.username}
          </Typography>

          <Typography variant="caption" color="text.secondary">
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
            onClick={() => {
              if (!user) {
                toast.error("You need to sign in first to like a comment.");
                return;
              }
              onToggleLike({
                user_id: user.user_id,
                comment_id: comment.id,
                type: 1,
              });
            }}
          >
            <ThumbUpOutlinedIcon fontSize="small" />

            <Typography variant="caption" sx={{ ml: 0.5 }}>
              {comment.total_likes}
            </Typography>
          </IconButton>

          {/* Dislike a comment */}
          <IconButton
            disableRipple
            size="small"
            onClick={() => {
              if (!user) {
                toast.error("You need to sign in first to dislike a comment.");
                return;
              }
              onToggleLike({
                user_id: user.user_id,
                comment_id: comment.id,
                type: -1,
              });
            }}
          >
            <ThumbDownOutlinedIcon fontSize="small" />

            <Typography variant="caption" sx={{ ml: 0.5 }}>
              {comment.total_dislikes}
            </Typography>
          </IconButton>

          {/* Reply to a comment */}
          {user && (
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

          {user && comment.user_id === user.user_id && (
            <Button
              disableRipple
              size="small"
              onClick={() =>
                onDeleteComment({ commentId: comment.id, userId: user.user_id })
              }
              sx={{ color: "red", ml: 1 }}
            >
              Delete
            </Button>
          )}
        </Box>

        {user && (
          <Collapse in={showReplyInput}>
            <Box sx={{ mt: 1 }}>
              <CommentInput
                reviewId={reviewId}
                parentId={comment.id}
                onSubmit={(content, reviewId, parentId) =>
                  onReplySubmit(content, reviewId, parentId)
                }
                placeholder="Write your reply..."
              />
            </Box>
          </Collapse>
        )}

        {comment.replies &&
          comment.replies.map((reply) => (
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
    </Box>
  );
};

export default CommentItem;
