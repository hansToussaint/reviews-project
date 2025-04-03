import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import UserAvatar from "./UserAvatar";
import theme from "../styles/Theme";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router";

interface CommentInputProps {
  placeholder?: string;
  reviewId: string;
  parentId?: string | null;
  onSubmit: (
    content: string,
    reviewId: string,
    parentId?: string | null
  ) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  placeholder = "Write a comment...",
  reviewId,
  parentId = null,
  onSubmit,
}) => {
  const location = useLocation();
  const { profile: user } = useAuth();

  const [commentText, setCommentText] = useState("");

  return (
    <>
      {user ? (
        <Box sx={{ display: "flex", alignItems: "flex-start", mt: 2 }}>
          <UserAvatar src={user.avatar_url} name={user.username} />

          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              placeholder={placeholder}
              variant="outlined"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{
                bgcolor: theme.palette.common.white,
                "& .MuiOutlinedInput-root": {
                  color: theme.palette.common.secondaryText,
                  "& fieldset": { borderColor: "rgba(0, 0, 0, 0.23)" },
                  "&:hover fieldset": { borderColor: "rgba(0, 0, 0, 0.23)" },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                },
              }}
            />

            {commentText.length > 0 && (
              <Box sx={{ textAlign: "right", mt: 1 }}>
                <Button
                  disableRipple
                  variant="contained"
                  onClick={() => {
                    onSubmit(commentText, reviewId, parentId);
                    setCommentText("");
                  }}
                  sx={{
                    bgcolor: theme.palette.common.black,
                    color: theme.palette.common.white,
                  }}
                >
                  Comment
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            fontStyle: "italic",
            color: "#3ac141",
            fontWeight: 700,
          }}
        >
          Please{" "}
          <Link
            to="/signin"
            state={{ from: location.pathname }}
            style={{
              textDecoration: "none",
              color: "#2d9833",
              borderBottom: `1px solid ${theme.palette.common.black}`,
            }}
          >
            sign in
          </Link>{" "}
          to leave a comment.
        </Typography>
      )}
    </>
  );
};

export default CommentInput;
