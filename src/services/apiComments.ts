import supabase from "./supabase";

// Interfaces
export interface Comment {
  id: string;
  user_id: string;
  content: string;
  parent_id: string | null;
  review_id: string;
  created_at: string;
  total_likes?: number;
  total_dislikes?: number;
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

// 🔹 Récupérer tous les commentaires d'un review avec leurs likes et replies
export async function fetchComments(reviewId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id, user_id, content, parent_id, review_id, created_at,
      comment_likes (type)
    `
    )
    .eq("review_id", reviewId);

  if (error) {
    throw error;
  }

  // Regrouper les likes et dislikes
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

  // Organiser les replies sous leurs commentaires principaux
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

// 🔹 Créer un commentaire ou un reply
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

// 🔹 Supprimer un commentaire (si l'utilisateur est le propriétaire)
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

// 🔹 Liker ou disliker un commentaire (ou annuler si déjà fait)
export async function toggleLikeDislike({
  user_id,
  comment_id,
  type,
}: LikeDislikeData): Promise<void> {
  // Vérifier si l'utilisateur a déjà liké/disliké ce commentaire
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
    // Si le même type de like/dislike est déjà fait, on l'annule
    if (data.type === type) {
      await supabase.from("comment_likes").delete().eq("id", data.id);
    } else {
      // Sinon, on met à jour le type
      await supabase.from("comment_likes").update({ type }).eq("id", data.id);
    }
  } else {
    // Sinon, on ajoute un nouveau like/dislike
    await supabase
      .from("comment_likes")
      .insert([{ user_id, comment_id, type }]);
  }
}
