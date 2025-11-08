import type { User } from "../types/User";

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
}
