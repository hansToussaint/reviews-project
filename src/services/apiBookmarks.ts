import { Review } from "./apiReviews";
import supabase from "./supabase";

export interface Bookmark {
  id: number;
  review_id: number;
  user_id: string;
  created_at: string;
  review: Review;
}

// Bookmark is linked to Review, so it returns array for review
interface RawBookmark {
  id: number;
  review_id: number;
  user_id: string;
  created_at: string;
  reviews: Review[];
}

export const getBookmarks = async (userId: string): Promise<Bookmark[]> => {
  const { data, error } = await supabase
    .from("bookmarks")
    .select(
      `
          id,
          review_id,
          user_id,
          created_at,
          reviews (
            id,
            title,
            created_at,
            content,
            image_urls
          )
        `
    )
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  const rawBookmarks = data as RawBookmark[];

  return rawBookmarks.map((bookmark) => ({
    ...bookmark,
    review: Array.isArray(bookmark.reviews)
      ? bookmark.reviews[0]
      : bookmark.reviews,
  }));
};

// Create a bookmark
export const createBookmark = async (reviewId: number, userId: string) => {
  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ review_id: reviewId, user_id: userId }]);

  if (error) {
    throw error;
  }
  return data;
};

// Delete bookmark
export const deleteBookmark = async (reviewId: number, userId: string) => {
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .match({ review_id: reviewId, user_id: userId });

  if (error) {
    throw error;
  }
  return data;
};

// Check if a specific review is bookmarked by the user
export const checkReviewBookmarked = async (
  reviewId: number,
  userId: string
) => {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("review_id")
    .eq("user_id", userId)
    .eq("review_id", reviewId)
    .single();

  if (error) {
    throw error;
  }

  return data ? true : false; // If the data exists, it means that the review is bookmarked
};
