import { useQuery } from "@tanstack/react-query";
import { fetchComments, Comment } from "../services/apiComments";

const useComments = (reviewId: string) => {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<Comment[], Error>({
    queryKey: ["comments", reviewId], // Clé unique pour chaque review
    queryFn: () => fetchComments(reviewId), // Fonction de récupération des comments
    enabled: !!reviewId, // Empêche la requête si reviewId est null ou undefined
  });

  return { comments, isLoading, error };
};

export default useComments;
