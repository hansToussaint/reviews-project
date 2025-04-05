import supabase from "./supabase";

// Interfaces

export interface CommentLike {
  id: string;
  user_id: string;
  type: 1 | -1;
}

export interface Comment {
  id: string;
  user_id: string;
  content: string;
  parent_id: string | null;
  review_id: string;
  created_at: string;
  total_likes?: number;
  total_dislikes?: number;
  comment_likes?: CommentLike[]; // Ajouté pour stocker les likes/dislikes
  replies?: Comment[];
}

export interface CreateCommentData {
  user_id: string;
  content: string;
  parent_id?: string | null;
  review_id: string;
}

export interface LikeDislikeData {
  user_id: string;
  comment_id: string;
  type: 1 | -1; // 1 for like, -1 for dislike
}

// get comments for a review with likes and replies
export async function fetchComments(reviewId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id, user_id, content, parent_id, review_id, created_at,
      comment_likes (id, user_id, type)
    `
    )
    .eq("review_id", reviewId);

  if (error) {
    throw error;
  }

  // Group likes & dislikes
  const commentsMap = new Map<string, Comment>();

  data.forEach((comment) => {
    const totalLikes =
      comment.comment_likes?.filter((l: { type: number }) => l.type === 1)
        .length || 0;

    const totalDislikes =
      comment.comment_likes?.filter((l: { type: number }) => l.type === -1)
        .length || 0;

    commentsMap.set(comment.id, {
      ...comment,
      total_likes: totalLikes,
      total_dislikes: totalDislikes,
      replies: [],
    });
  });

  // Organize replies under their comments
  const commentsList: Comment[] = [];

  commentsMap.forEach((comment) => {
    if (comment.parent_id) {
      const parent = commentsMap.get(comment.parent_id);

      if (parent) {
        parent.replies?.push(comment);
      }
    } else {
      commentsList.push(comment);
    }
  });

  return commentsList;
}

// create a comment or reply
export async function createComment(
  commentData: CreateCommentData
): Promise<Comment> {
  const { data, error } = await supabase
    .from("comments")
    .insert([commentData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// delete comment (only for own user)
export async function deleteComment(
  commentId: string,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", userId);

  if (error) {
    throw error;
  }
}

// like/dislke comment (or delete)
export async function toggleLikeDislike({
  user_id,
  comment_id,
  type,
}: LikeDislikeData): Promise<void> {
  // verifying is the user already liked/disliked the current comment
  const { data, error } = await supabase
    .from("comment_likes")
    .select("*")
    .eq("user_id", user_id)
    .eq("comment_id", comment_id)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  if (data) {
    // if same type, ddelete the like/dislike
    if (data.type === type) {
      await supabase.from("comment_likes").delete().eq("id", data.id);
    } else {
      // otherwise, update type
      await supabase.from("comment_likes").update({ type }).eq("id", data.id);
    }
  } else {
    // or add a new like/dislike
    await supabase
      .from("comment_likes")
      .insert([{ user_id, comment_id, type }]);
  }
}
