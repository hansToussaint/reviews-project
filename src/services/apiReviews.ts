import supabase from "./supabase";

// interfaces
export interface Review {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  image_urls?: string[];
  created_at: string;
}

export interface CreateReviewData {
  user_id: string;
  title: string;
  content: string;
  category: string;
  image_urls?: string[];
}

export interface UpdateReviewData {
  title?: string;
  content?: string;
  category?: string;
  image_urls?: string[];
}

// get all reviews
export async function fetchReviews(): Promise<Review[]> {
  const { data, error } = await supabase.from("reviews").select("*");
  if (error) {
    throw error;
  }
  return data || [];
}

// get a single review
export async function getReview(reviewId: string): Promise<Review> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", reviewId)
    .single();
  if (error) {
    throw error;
  }
  return data;
}

// Create review
export async function createReview(
  reviewData: CreateReviewData
): Promise<Review> {
  const { data, error } = await supabase
    .from("reviews")
    .insert([reviewData])
    .select()
    .single();
  if (error) {
    throw error;
  }
  return data;
}

// update review
export async function updateReview(
  reviewId: string,
  userId: string,
  reviewData: UpdateReviewData
): Promise<Review> {
  const { data, error } = await supabase
    .from("reviews")
    .update(reviewData)
    .eq("id", reviewId)
    .eq("user_id", userId)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return data;
}

// delete review
export async function deleteReview(
  reviewId: string,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId)
    .eq("user_id", userId);
  if (error) {
    throw error;
  }
}
