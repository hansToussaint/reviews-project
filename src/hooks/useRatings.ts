import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchReviewRating,
  ReviewRatingData,
  upsertRating,
} from "../services/apiRatings";
import { useAuth } from "../context/AuthContext";

const useRatings = (reviewId: number) => {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<ReviewRatingData, Error>({
    queryKey: ["ratings", reviewId, profile?.user_id],
    queryFn: () => fetchReviewRating(reviewId, profile?.user_id),
    enabled: Boolean(reviewId),
  });

  // ceate or update rate
  const { mutate: rateMutate, isPending: isRatingLoading } = useMutation({
    mutationFn: (rating: number) => {
      if (!profile) {
        throw new Error("User not authenticated");
      }
      return upsertRating(reviewId, profile.user_id, rating);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings", reviewId] });
    },
  });

  return { ratingData: data, isLoading, error, rateMutate, isRatingLoading };
};

export default useRatings;
