import { useQuery } from "@tanstack/react-query";
import { getBookmarks, Bookmark } from "../services/apiBookmarks";

const useBookmarks = (userId: string) => {
  const { data, isLoading, error } = useQuery<Bookmark[], Error>({
    queryKey: ["bookmarks", userId],
    queryFn: () => getBookmarks(userId),
    enabled: !!userId,
  });

  return { bookmarks: data || [], isLoading, error };
};

export default useBookmarks;
