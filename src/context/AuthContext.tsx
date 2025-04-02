import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, Profile, signOut } from "../services/authService";

interface AuthContextProps {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  loading: boolean;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user and profile on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentProfile = await getCurrentUser();
        setProfile(currentProfile);
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signOutUser = async () => {
    await signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ profile, setProfile, loading, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// The hook to use auth context
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("You must use useAuth into an AuthProvider");
  }
  return context;
};
