import supabase from "./supabase";

export interface RatingData {
  id: number;
  review_id: number;
  user_id: string;
  rating: number;
  created_at: string;
}

export interface ReviewRatingData {
  review_id: number;
  rating_count: number;
  average_rating: number;
  user_rating?: number;
}

// Get ratings for a review and calculate  average
export async function fetchReviewRating(
  reviewId: number,
  userId?: string
): Promise<ReviewRatingData> {
  // Get all rating for the review
  const { data, error } = await supabase
    .from("ratings")
    .select("rating, user_id")
    .eq("review_id", reviewId);

  if (error) {
    throw error;
  }

  const rating_count = data.length;
  const total = data.reduce(
    (sum: number, row: { rating: number }) => sum + row.rating,
    0
  );
  const average_rating = rating_count > 0 ? total / rating_count : 0;

  // Verifying is the current user has rating on this review
  const user_rating = userId
    ? data.find((row) => row.user_id === userId)?.rating || null
    : null;

  return {
    review_id: reviewId,
    rating_count,
    average_rating,
    user_rating,
  };
}

// all users can just 1 time give rate
export async function upsertRating(
  reviewId: number,
  userId: string,
  rating: number
): Promise<RatingData> {
  const { data, error } = await supabase
    .from("ratings")
    .upsert([{ review_id: reviewId, user_id: userId, rating }], {
      onConflict: "review_id,user_id",
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  return data;
}
