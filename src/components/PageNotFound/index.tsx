import { Link, useLocation } from "react-router-dom";

export const PageNotFound = () => {
  const { pathname } = useLocation();

  return (
    <div style={{ textAlign: "center" }}>
      <h2>404</h2>
      <h3>
        Page not found for route <code>{pathname}</code>
      </h3>
      <h3>
        <Link to="/">Go Home</Link>
      </h3>
    </div>
  );
};
