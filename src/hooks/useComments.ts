import { useQuery } from "@tanstack/react-query";
import { fetchComments, Comment } from "../services/apiComments";

const useComments = (reviewId: string) => {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<Comment[], Error>({
    queryKey: ["comments", reviewId],
    queryFn: () => fetchComments(reviewId),
    enabled: !!reviewId,
  });

  return { comments, isLoading, error };
};

export default useComments;
