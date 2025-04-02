import { useQuery } from "@tanstack/react-query";

import { getProfileByUserId, Profile } from "../services/authService";

const useProfile = (userId: string) => {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<Profile, Error>({
    queryKey: ["profile", userId], // Unique key per user
    queryFn: () => getProfileByUserId(userId), // Function to fetch profile data
    enabled: !!userId, // Only run if userId is provided
  });

  return { profile, isLoading, error };
};

export default useProfile;
