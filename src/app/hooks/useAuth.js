import { authContext } from "app/contexts/AuthContext";
import { useContext } from "react";

export function useAuth() {
    return useContext(authContext);
  }