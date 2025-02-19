
import { useAuth } from "app/hooks/useAuth";
import { PATH } from "../../config";
import { Navigate, useLocation } from "react-router-dom";
// HOOK


export default function AuthGuard({ children }) {
  const auth = useAuth();
  const { pathname } = useLocation();

  if (auth && auth.token) return <>{children}</>;

  return <Navigate replace to={PATH.LOGIN} state={{ from: pathname }} />;
}
