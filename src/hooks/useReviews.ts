import { useQuery } from "@tanstack/react-query";
import { fetchReviews, Review } from "../services/apiReviews";

const useReviews = () => {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery<Review[], Error>({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  return { reviews, isLoading, error };
};

export default useReviews;
