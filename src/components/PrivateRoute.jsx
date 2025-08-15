import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // Debug logging
  console.log("PrivateRoute Debug:");
  console.log("- Current user:", user);
  console.log("- User role:", user?.role);
  console.log("- Allowed roles:", allowedRoles);
  console.log("- Is role allowed?", allowedRoles ? allowedRoles.includes(user?.role) : "No role restriction");

  // If no user is logged in, redirect to login
  if (!user) {
    console.log("- Redirecting to login: No user found");
    return <Navigate to="/" replace />;
  }

  // If allowedRoles is specified, check if user has the right role
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log("- Access denied: User role not in allowed roles");
    // Better to show an access denied page or redirect to appropriate dashboard
    // For now, redirect to login with a message
    return <Navigate to="/" replace />;
  }

  console.log("- Access granted");
  return children;
}

export default PrivateRoute;