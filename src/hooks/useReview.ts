import { useQuery } from "@tanstack/react-query";

import { getReview, Review } from "../services/apiReviews";

const useReview = (reviewId: string) => {
  const {
    data: review,
    isLoading,
    error,
  } = useQuery<Review, Error>({
    queryKey: ["review", reviewId],
    queryFn: () => getReview(reviewId),
    enabled: !!reviewId,
  });
  return { review, isLoading, error };
};

export default useReview;
