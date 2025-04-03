import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

import {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
} from "../services/authService";
import { useAuth } from "../context/AuthContext";

// Hook for sign in
const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const { setProfile } = useAuth();

  const { mutate: mutateSignIn, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onSuccess: async () => {
      // getting full profile from the profiles table
      const profile = await getCurrentUser();

      if (!profile) {
        throw new Error("Profile not found after sign in");
      }

      // Update Auth Context and cache the user data
      setProfile(profile);
      queryClient.setQueryData(["user", profile.user_id], profile);

      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
      toast.success("Welcome!");
    },
    onError: (err) => {
      console.error("Sign in error: ", err);
      toast.error("Invalid email or password. Try again please!");
    },
  });

  return { mutateSignIn, isLoading };
};

// Hook for sign up
const useSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setProfile } = useAuth();

  const { mutate: mutateSignUp, isPending: isLoading } = useMutation({
    mutationFn: async ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => {
      const result = await signUp(email, password, username);

      // Wait to be sure that the session is created
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return result;
    },

    onSuccess: async () => {
      const fullProfile = await getCurrentUser();
      if (!fullProfile) throw new Error("Profile not found after sign up");

      // Update Auth Context and cache the new profile
      setProfile(fullProfile);
      queryClient.setQueryData(["user", fullProfile.user_id], fullProfile);

      navigate("/", { replace: true });
      toast.success("Account created successfully!");
    },
    onError: (error) => {
      console.error("Sign up error:", error);
      toast.error("Error while sign up. Please try again.");
    },
  });

  return { mutateSignUp, isLoading };
};

// Hook for sign out
const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setProfile } = useAuth();

  const { mutate: mutateSignOut, isPending: isLoading } = useMutation({
    mutationFn: () => signOut(),

    onSuccess: (_, previousPage?: string) => {
      setProfile(null);
      toast.success("You signed out.");

      navigate(previousPage || "/", { replace: true });

      // delete user data from cahe
      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Sign out error:", error);
      toast.error("Error signing out. Please try again.");
    },
  });

  return { mutateSignOut, isLoading };
};

export { useSignIn, useSignUp, useSignOut };
